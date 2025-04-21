import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { getTypes } from '../../../services/TypeService';
import { getUnit } from '../../../services/UnitService';
import axios from 'axios';

const ProductModalForm = ({ open, onCancel, onSubmit, initialData }) => {
  const [form] = Form.useForm();
  const [newId, setNewId] = useState('');
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);

  const fetchTypes = async () => {
    try {
      const result = await getTypes();
      setTypes(result);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลประเภท:', error);
    }
  };

  const fetchUnits = async () => {
    try {
      const result = await getUnit();
      setUnits(result);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลหน่วยนับ:', error);
    }
  };

  const fetchNewId = async () => {
    try {
      const res = await axios.get('http://localhost:3000/products/generateNewId');
      const newId = res.data.product_id; 
      setNewId(newId);  
      form.setFieldsValue({ product_id: newId });  
    } catch (err) {
      console.error('Error generating ID:', err);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchUnits();
    if (!open) return; 
    if (initialData) {
      form.setFieldsValue(initialData); 
    } else {
      fetchNewId(); 
    }
  }, [open, initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
<Modal
  title={initialData ? 'แก้ไขหน่วยนับ' : 'เพิ่มหน่วยนับ'}
  open={open}
  onOk={handleOk}
  onCancel={handleCancel}
  width={800}
  okText="บันทึก"
  cancelText="ยกเลิก"
>
  <Form form={form} layout="vertical">
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item 
          label="รหัสสินค้า" 
          name="product_id"
        >
          <Input value={newId} readOnly />
        </Form.Item>

        <Form.Item
          label="ชื่อสินค้า"
          name="product_name"
          rules={[{ required: true, message: 'กรุณากรอกชื่อสินค้า' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ราคาสินค้า"
          name="product_price"
          rules={[{ required: true, message: 'กรุณากรอกราคาสินค้า' }]}
        >
          <Input />
        </Form.Item>

      </Col>

      <Col span={12}>
        <Form.Item
          label="ประเภทสินค้า"
          name="type_id"
          rules={[{ required: true, message: 'กรุณาเลือกประเภทสินค้า' }]}
        >
          <Select placeholder="กรุณาเลือกประเภทสินค้า" allowClear>
            {types.map(type => (
              <Select.Option key={type.type_id} value={type.type_id}>
                {type.type_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="หน่วยนับสินค้า"
          name="unit_id"
          rules={[{ required: true, message: 'กรุณาเลือกหน่วยนับสินค้า' }]}
        >
          <Select placeholder="กรุณาเลือกหน่วยนับสินค้า" allowClear>
            {units.map(unit => (
              <Select.Option key={unit.unit_id} value={unit.unit_id}>
                {unit.unit_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

      </Col>
    </Row>
  </Form>
</Modal>
  );
};

export default ProductModalForm;
