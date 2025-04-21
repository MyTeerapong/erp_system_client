import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Table, Button, Input, Space } from 'antd';
import { getProducts, insertProduct, updateProduct, deleteProduct} from '../../services/ProductService';
import { getTypes } from '../../services/TypeService';
import { getUnit } from '../../services/UnitService';

import Swal from 'sweetalert2';
import ProductModalForm from './component/modal';
import { SearchOutlined, PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';

const { Search } = Input;

const App = () => {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getProducts();
      setData(result);
      const type = await getTypes();
      setTypes(type);
      const unit = await getUnit();
      setUnits(unit);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeName = (typename => {
    const type = types.find(item => item.type_id === typename);
    return type ? type.type_name : '-';
  });

  const getUnitName = (unitname => {
    const unit = units.find(item => item.unit_id === unitname);
    return unit ? unit.unit_name : '-';
  });

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingData(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = async (values) => {
    try {
      const dataToUpdate = {
        ...values,
        product_id: editingData.product_id, 
        product_price: parseFloat(values.product_price),
      };
      if (editingData) {
        await updateProduct(dataToUpdate);
        Swal.fire('อัปเดตสำเร็จ', '', 'success');
      } else {
        await insertProduct(values);
        Swal.fire('เพิ่มข้อมูลสำเร็จ', '', 'success');
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตข้อมูลได้', 'error');
    }
  };
  

  const handleDelete = async (product_id) => {
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: `ข้อมูล ${product_id} จะถูกลบออก`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(product_id);
          Swal.fire('ลบสำเร็จ!', `ลบข้อมูล ID: ${product_id} แล้ว`, 'success');
          fetchData();
        } catch {
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบข้อมูลได้', 'error');
        }
      }
    });
  };

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>รหัสสินค้า</div>,
      dataIndex: 'product_id',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>ชื่อสินค้า</div>,
      dataIndex: 'product_name',
      align: 'left',
    },
    {
      title: <div style={{ textAlign: 'center' }}>ราคา</div>,
      dataIndex: 'product_price',
      align: 'left',
    },
    {
      title: <div style={{ textAlign: 'center' }}>ประเภท</div>,
      dataIndex: 'type_id',
      align: 'left',
      render: (typename) => getTypeName(typename),
    },
    {
      title: <div style={{ textAlign: 'center' }}>หน่วยนับ</div>,
      dataIndex: 'unit_id',
      align: 'left',
      render: (unitname) => getUnitName(unitname),
    },
    {
      title: <div style={{ textAlign: 'center' }}></div>,
      key: 'action',
      align: 'center',
      width: '25%',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => openEditModal(record)}
            style={{ width: '80px', height: '32px' }}
          >
            <EditFilled /> แก้ไข
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => handleDelete(record.product_id)}
            style={{ width: '80px', height: '32px' }}
          >
            <DeleteFilled /> ลบ
          </Button>
        </Space>
      ),
    }
  ];

  const filteredData = data.filter(item =>
    item.product_name.toLowerCase().includes(searchName.toLowerCase()) &&
    item.product_id.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <>
      <Row justify={'space-between'}>
        <Col>
          <h1>สินค้า</h1>
        </Col>
        <Col>
          <Button type="default" onClick={openAddModal}><PlusOutlined /> เพิ่มสินค้า</Button>
        </Col>
      </Row>

      <div style={{ margin: '20px 0' }}>
        <Space direction="horizontal" size="middle">
          <Search
            placeholder="รหัสสินค้า"
            allowClear
            enterButton="ค้นหา"
            size="middle"
            onSearch={value => setSearchId(value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
          />
          <Search
            placeholder="ชื่อสินค้า"
            allowClear
            enterButton="ค้นหา"
            size="middle"
            onSearch={value => setSearchName(value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
          />
        </Space>
      </div>

      <Divider>รายการสินค้า</Divider>
      <Table
        columns={columns}
        dataSource={filteredData}
        size="small"
        rowKey="product_id"
        bordered
        loading={loading}
        style={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}
      />

      <ProductModalForm
        open={isModalOpen}
        onCancel={closeModal}
        onSubmit={handleSubmitForm}
        initialData={editingData}
      />
    </>
  );
};

export default App;
