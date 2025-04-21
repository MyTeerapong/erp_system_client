import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Table, Button, Input, Space } from 'antd';
import { getUnit, inserUnit, updateUnit, deleteUnit } from '../../services/UnitService';
import Swal from 'sweetalert2';
import UnitModalForm from './component/modal';
import { SearchOutlined, PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';

const { Search } = Input;

const App = () => {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getUnit();
      setData(result);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
    } finally {
        setLoading(false);
        }
  };

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
      if (editingData) {
        const dataToUpdate = {
          ...values,
          unit_id: editingData.unit_id, 
        };
        await updateUnit(dataToUpdate);
        Swal.fire('อัปเดตสำเร็จ', '', 'success');
      } else {
        await inserUnit(values);
        Swal.fire('เพิ่มข้อมูลสำเร็จ', '', 'success');
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตข้อมูลได้', 'error');
    }
  };
  

  const handleDelete = async (unit_id) => {
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: `ข้อมูล ${unit_id} จะถูกลบออก`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUnit(unit_id);
          Swal.fire('ลบสำเร็จ!', `ลบข้อมูล ID: ${unit_id} แล้ว`, 'success');
          fetchData();
        } catch {
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบข้อมูลได้', 'error');
        }
      }
    });
  };

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>รหัสหน่วยนับ</div>,
      dataIndex: 'unit_id',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>หน่วยนับ</div>,
      dataIndex: 'unit_name',
      align: 'left',
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
            onClick={() => handleDelete(record.unit_id)}
            style={{ width: '80px', height: '32px' }}
          >
            <DeleteFilled /> ลบ
          </Button>
        </Space>
      ),
    }
  ];

  const filteredData = data.filter(item =>
    item.unit_name.toLowerCase().includes(searchName.toLowerCase()) &&
    item.unit_id.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <>
      <Row justify={'space-between'}>
        <Col>
          <h1>หน่วยนับ</h1>
        </Col>
        <Col>
          <Button type="default" onClick={openAddModal}><PlusOutlined /> เพิ่มหน่วยนับ</Button>
        </Col>
      </Row>

      <div style={{ margin: '20px 0' }}>
        <Space direction="horizontal" size="middle">
          <Search
            placeholder="รหัสหน่วยนับ"
            allowClear
            enterButton="ค้นหา"
            size="middle"
            onSearch={value => setSearchId(value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
          />
          <Search
            placeholder="ชื่อหน่วยนับ"
            allowClear
            enterButton="ค้นหา"
            size="middle"
            onSearch={value => setSearchName(value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
          />
        </Space>
      </div>

      <Divider>รายการหน่วยนับ</Divider>
      <Table
        columns={columns}
        dataSource={filteredData}
        size="small"
        rowKey="type_id"
        bordered
        loading={loading}
        style={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}
      />

      <UnitModalForm
        open={isModalOpen}
        onCancel={closeModal}
        onSubmit={handleSubmitForm}
        initialData={editingData}
      />
    </>
  );
};

export default App;
