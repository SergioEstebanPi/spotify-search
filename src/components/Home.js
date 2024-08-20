import React from 'react';
import { Layout, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => (
  <Layout style={{ minHeight: '50vh', backgroundColor: '#f5f5f5' }}>
    <Header style={{ 
      backgroundColor: '#00d755',
      padding: '50px 50px'
    }}>
      <Title level={2} style={{ 
          color: '#ffffff',
      }}>
          Welcome to the Spotify Challenge
      </Title>
    </Header>
    <Content
      style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '24px',
          backgroundColor: '#ffffff',
      }}
      >
      <Outlet />
    </Content>
  </Layout>
);

export default Home;
