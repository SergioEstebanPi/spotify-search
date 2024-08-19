import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { Button, Card, Form, Input, Spin, Typography, Layout, Space } from 'antd';
import ErrorComponent from '../components/ErrorComponent';
import './SearchForm.css';  // Import the CSS file

const { Title } = Typography;
const { Header, Content } = Layout;

const SearchForm = () => {
    const [isrc, setIsrc] = useState('');
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.track);

    const { fetchData: fetchTrack } = useApi('codechallenge/createTrack', 'POST');

    useEffect(() => {
        if (status === 'succeeded') {
            navigate(`/track/${isrc}`);
        }
    }, [status, isrc, navigate]);

    const handleSubmit = async () => {
        if (isrc.trim()) {
            await fetchTrack({ isrc });
        }
    };

    return (
        <Layout className="layout">
            <Header className="header">
                <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
                    <Title level={3} className="header-title">Track Search</Title>
                </div>
            </Header>
            <Content className="content">
                <Card
                    title="Search for Track"
                    className="card"
                    bodyStyle={{ padding: '24px' }}
                >
                    {status === 'failed' && <ErrorComponent message={error} className="error-message" />}
                    {status === 'loading' && <div className="spinner-container"><Spin /></div>}
                    <Form
                        name="search-form"
                        layout="vertical"
                        style={{ maxWidth: 400 }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="ISRC Code"
                            name="isrc"
                            rules={[{ required: true, message: 'Please input ISRC code!' }]}
                            style={{ marginBottom: 16 }}
                        >
                            <Input
                                type="text"
                                value={isrc}
                                onChange={(e) => setIsrc(e.target.value)}
                                placeholder="Enter ISRC code"
                                className="input"
                            />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                onClick={handleSubmit}
                                className="button"
                            >
                                Search
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default SearchForm;
