import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { Button, Card, Form, Input, Spin, Typography } from 'antd';
import ErrorComponent from '../components/ErrorComponent';
import './SearchForm.css';

const { Title } = Typography;

const SearchForm = () => {
    const [isrc, setIsrc] = useState('');
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.track);

    const { fetchData: fetchTrack } = useApi('codechallenge/createTrack', 'POST');

    useEffect(() => {
        if (status === 'succeeded') {
            if(isrc){
                navigate(`/track/${isrc}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    const handleSubmit = async () => {
        if (isrc.trim()) {
            await fetchTrack({ isrc });
        }
    };

    return (
        <Card
            title="Search for Track"
            className="card"
        >
            <Form
                name="search-form"
                layout="vertical"
                style={{ width: '100%' }}
                autoComplete="off"
            >
                {status === 'failed' && <ErrorComponent message={error} className="error-message" />}
                {status === 'loading' && <div className="spinner-container"><Spin /></div>}
                <Form.Item
                    label="ISRC Code (e.g. SE5Q52000915)"
                    name="isrc"
                    rules={[{ required: true, message: 'Please input ISRC code!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input
                        type="text"
                        value={isrc}
                        style={{ padding: 10 }}
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
                        style={{
                            backgroundColor: '#00d755',
                            padding: '25px 25px',
                            border: 0
                        }}
                    >
                        <Title level={4} style={{ 
                            color: 'white',
                        }}>
                            Search
                        </Title>
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SearchForm;
