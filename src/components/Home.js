import React from 'react';
import 'antd/dist/reset.css';

import { Button, Layout, Typography, Space } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;


const Home = () => (
  <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
    <Header style={{ backgroundColor: '#ffffff', padding: '0 24px' }}>
      <div className="logo" />
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
      <Title level={2} style={{ color: '#333' }}>
        Welcome to the Spotify Challenge
      </Title>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          href="http://localhost:8080/oauth2/authorization/spotify"
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Login with Spotify
        </Button>
      </Space>
    </Content>
  </Layout>
);

export default Home;
