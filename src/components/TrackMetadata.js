import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import CoverImage from './CoverImage';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';

const TrackMetadata = () => {
    const {isrc} = useParams();
    const { metadata, status, error } = useSelector((state) => state.track);

    const { fetchData: fetchMetadata } = useApi('codechallenge/getTrackMetadata');

    useEffect(() => {
        if (isrc) {
            const fetchTrack = async () => {
                await fetchMetadata({isrc});
            };
    
            fetchTrack();
        }
    }, [isrc]);

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && metadata && (
                    <div>
                        <h2>{metadata.name}</h2>
                        <p><strong>Artist:</strong> {metadata.artistName}</p>
                        <p><strong>Album:</strong> {metadata.albumName}</p>
                        <p><strong>Explicit:</strong> {metadata.isExplicit ? 'Yes' : 'No'}</p>
                        <p><strong>Playback Seconds:</strong> {metadata.playbackSeconds}</p>
                        <CoverImage isrc={metadata.isrc} />
                    </div>
                )
            }
            {status === 'failed' && <p>Not data found</p>}
        </div>
    );
};

export default TrackMetadata;