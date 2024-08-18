import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import CoverImage from './CoverImage';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { BASEURL, BASIC } from '../constants/constants';
const { Title, Text } = Typography;

const TrackMetadata = () => {
    const {isrc} = useParams();
    const { metadata, status, error } = useSelector((state) => state.track);

    const { fetchData: fetchMetadata } = useApi('codechallenge/getTrackMetadata');
    const [img, setImg] = useState();

    useEffect(() => {
        if (isrc) {
            const fetchTrack = async () => {
                await fetchMetadata({isrc});
            };
            const fetchImage = async () => {
                const res = await fetch(BASEURL + 'codechallenge/getCover?isrc=' + isrc, {
                    method: 'GET',
                    headers: {
                        'Authorization': BASIC + 'dXNlcjpwYXNzd29yZA==',
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

    return (
        <div>
            <Card
                title="Song Information"
                style={{ width: 600, margin: '0 auto', marginTop: 50 }}
                >
                {status === 'loading' && <Spin />}
                {status === 'succeeded' && metadata && (
                    <div>
                        <CoverImage img={img} />
                        <Row gutter={16}>
                            <Col span={24}>
                            <Title level={4}>Artist: <Text>{metadata.name}</Text></Title>
                            </Col>
                            <Col span={24}>
                            <Title level={4}>Artist: <Text>{metadata.artistName}</Text></Title>
                            </Col>
                            <Col span={24}>
                            <Title level={4}>Album: <Text>{metadata.albumName}</Text></Title>
                            </Col>
                            <Col span={24}>
                            <Title level={4}>Explicit: <Text>{metadata.isExplicit ? 'Yes' : 'No'}</Text></Title>
                            </Col>
                            <Col span={24}>
                            <Title level={4}>Playback Time: <Text>{metadata.playbackSeconds} seconds</Text></Title>
                            </Col>
                            <Col span={24}>
                            <Link to="/"><Button>Go to Search</Button></Link>
                            </Col>
                        </Row>
                    </div>
                )}
                {status === 'failed' && (
                    <div>
                        <p>Not data found</p>
                        <Link to="/"><Button>Go to Search</Button></Link>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TrackMetadata;