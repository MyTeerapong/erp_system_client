import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom'; 

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('หน้าหลัก', 'dashboard', <PieChartOutlined />),
  getItem('บันทึกข้อมูลหลัก', 'sub1', <UserOutlined />, [
    getItem('ประเภทสินค้า', 'type'),
    getItem('สินค้า', 'product'),
    getItem('พนักงาน', 'employee'),
    getItem('แผนก', 'department'),
  ]),
  getItem('ผลิตสินค้า', 'sub2', <TeamOutlined />, [
    getItem('การผลิต', 'production'),
  ]),  
  getItem('ขายสินค้า', 'sub3', <TeamOutlined />, [
    getItem('หน้าร้าน', 'sell_offline'),
    getItem('ออนไลน์', 'sell_online'),
  ]),
  getItem('รับวัตถุดิบ', 'sub4', <TeamOutlined />, [
    getItem('การรับวัตถุดิบ', 'rawMaterial'),
  ]),
  getItem('บัญชี', 'sub5', <TeamOutlined />, [
    getItem('บัญชีแยกประเภท', 'ledger'),
    getItem('บัญชีเจ้าหนี้', 'AccountsPayable'),
    getItem('บัญชีลูกหนี้', 'AccountsReceivable'),
    getItem('ระบบภาษี', 'tax'),
    getItem('งบประมาณ', 'budget'),
  ]),
  getItem('รายงาน', 'sub6', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
];

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = ({ key }) => {
    if (!key.startsWith('sub')) {
      navigate(`/${key === 'dashboard' ? '' : key}`);
    }
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['dashboard']}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
