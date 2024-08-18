import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { Button, Card, Form, Input, Spin } from 'antd';
import ErrorComponent from '../components/ErrorComponent';

const SearchForm = () => {
    const [isrc, setIsrc] = useState('');
    const navigate = useNavigate();
    const { metadata, status, error } = useSelector((state) => state.track);

    const { fetchData: fetchTrack } = useApi('codechallenge/createTrack', 'POST');

    useEffect(() => {
        if(status === 'succeeded'){
            navigate(`/track/${isrc}`);
        }
    }, [status])

    const handleSubmit = async (e) => {
        await fetchTrack({isrc});
    };

    return (
        <div>
            <Card
                title="Tracks Search"
                style={{ width: 400, margin: '0 auto', marginTop: 50 }}
                >
                {status === 'failed' && <ErrorComponent message={error} />}
                {status === 'loading' && <Spin />}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Input
                        type="text"
                        value={isrc}
                        onChange={(e) => setIsrc(e.target.value)}
                        placeholder="Enter ISRC code"
                        required
                    />
                    <Button type="primary" onClick={handleSubmit}>
                        Search
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default SearchForm;