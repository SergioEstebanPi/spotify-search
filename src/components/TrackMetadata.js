import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { Button, Card, Col, Flex, Row, Spin, Typography } from 'antd';
import { BASEURL, BASIC } from '../constants/constants';
import './TrackMetadata.css';

const { Title, Text } = Typography;

const TrackMetadata = () => {
    const { isrc } = useParams();
    const { metadata, status, error } = useSelector((state) => state.track);

    const { fetchData: fetchMetadata } = useApi('codechallenge/getTrackMetadata');
    const [img, setImg] = useState();
    
    useEffect(() => {
        if (isrc) {
            const fetchTrack = async () => {
                await fetchMetadata({ isrc });
            };
            const fetchImage = async () => {
                const res = await fetch(BASEURL + 'codechallenge/getCover?isrc=' + isrc, {
                    method: 'GET',
                    headers: {
                        'Authorization': BASIC + process.env.REACT_APP_AUTH_BASIC || '',
                    },
                });
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImg(imageObjectURL);
            };

            fetchTrack();
            fetchImage();
        }
    }, [isrc]);

    const GoToSearchButton = () => {
        return (
            <Link to="../search">
                <Button
                    className="button"
                    style={{
                        color: 'white',
                        backgroundColor: '#00d755',
                        padding: '25px 25px',
                        border: 0
                    }}
                >
                    <Title level={4} style={{ 
                        color: 'white',
                    }}>
                        {"<"} Go to Search
                    </Title>
                </Button>
            </Link>
        )
    }

    return (
        <Card
            hoverable
            style={{
                width: 600,
            }}
            title={status === 'succeeded' && metadata && "Song Information " + metadata.isrc}
            className="card"
            styles={{
                body: {
                    padding: 0,
                    overflow: 'hidden',
                },
                width: 600,
            }}
        >
            <Flex justify="space-between">
                <img
                    alt="avatar"
                    src={img}
                    style={{
                        display: 'block',
                        maxWidth: 250,
                        maxHeight: 250
                    }}
                />
                <Flex
                    vertical
                    align="flex-end"
                    justify="space-between"
                    style={{
                        padding: 32,
                    }}
                >
                    {status === 'loading' && <div className="spinner-container"><Spin /></div>}
                        {status === 'succeeded' && metadata && (
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Title level={4} className="card-title">Name: <Text className="text">{metadata.name}</Text></Title>
                                </Col>
                                <Col span={24}>
                                    <Title level={4} className="card-title">Artist: <Text className="text">{metadata.artistName}</Text></Title>
                                </Col>
                                <Col span={24}>
                                    <Title level={4} className="card-title">Album: <Text className="text">{metadata.albumName}</Text></Title>
                                </Col>
                                <Col span={24}>
                                    <Title level={4} className="card-title">Explicit: <Text className="text">{metadata.isExplicit ? 'Yes' : 'No'}</Text></Title>
                                </Col>
                                <Col span={24}>
                                    <Title level={4} className="card-title">Playback Time: <Text className="text">{metadata.playbackSeconds} seconds</Text></Title>
                                </Col>
                            </Row>
                        )}
                        {status === 'failed' && (
                            <div className="error-message">
                                <p>No data found: {error}</p>
                            </div>
                        )}
                </Flex>
            </Flex>
            <GoToSearchButton />
        </Card>
    );
};

export default TrackMetadata;
