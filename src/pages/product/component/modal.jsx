import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';

const UnitModalForm = ({ open, onCancel, onSubmit, initialData }) => {
  const [form] = Form.useForm();
  const [newId, setNewId] = useState('');

  const fetchNewId = async () => {
    try {
      const res = await axios.get('http://localhost:3000/types/generateNewId');
      const newId = res.data.type_id; 
      setNewId(newId);  
      form.setFieldsValue({ type_id: newId });  
    } catch (err) {
      console.error('Error generating ID:', err);
    }
  };

  useEffect(() => {
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
      width={600}
      okText="บันทึก"
      cancelText="ยกเลิก"
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          label="รหัสหน่วยนับ" 
          name="type_id"
        >
          <Input value={newId} readOnly />
        </Form.Item>
        <Form.Item
          label="หน่วยนับ"
          name="type_name"
          rules={[{ required: true, message: 'กรุณากรอกหน่วยนับ' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UnitModalForm;
