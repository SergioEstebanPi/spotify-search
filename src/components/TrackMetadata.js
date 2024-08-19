import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CoverImage from './CoverImage';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { BASEURL, BASIC } from '../constants/constants';
import './TrackMetadata.css';

const { Title, Text } = Typography;

const TrackMetadata = () => {
    const { isrc } = useParams();
    const { metadata, status, error } = useSelector((state) => state.track);

    const { fetchData: fetchMetadata } = useApi('codechallenge/getTrackMetadata');
    const { fetchData: fetchCover } = useApi('codechallenge/getCover?isrc=');
    const [img, setImg] = useState();

    useEffect(() => {
        if (isrc) {
            const fetchTrack = async () => {
                await fetchMetadata({ isrc });
            };
            const fetchImage = async () => {
                const res = await fetchCover({isrc});
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImg(imageObjectURL);
            };

            fetchTrack();
            fetchImage();
        }
    }, [isrc]);

    return (
        <div className="container">
            <Card
                title="Song Information"
                className="card"
            >
                {status === 'loading' && <div className="spinner-container"><Spin /></div>}
                {status === 'succeeded' && metadata && (
                    <div>
                        <div className="cover-image-container">
                            <CoverImage img={img} />
                        </div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Title level={4} className="card-title">Artist: <Text className="text">{metadata.name}</Text></Title>
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
                            <Col span={24}>
                                <Link to="/"><Button className="button">Go to Search</Button></Link>
                            </Col>
                        </Row>
                    </div>
                )}
                {status === 'failed' && (
                    <div className="error-message">
                        <p>No data found</p>
                        <Link to="/"><Button className="button">Go to Search</Button></Link>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TrackMetadata;
