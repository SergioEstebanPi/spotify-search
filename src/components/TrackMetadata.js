import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import CoverImage from './CoverImage';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { fetchTrackFailure, fetchTrackRequest, fetchTrackSuccess } from '../features/Track/TrackSlice';

const TrackMetadata = () => {
    const {isrc} = useParams();
    const dispatch = useDispatch();

    const { data: metadataData, loading: metadataLoading, error: metadataError, fetchData: fetchMetadata } = useApi('codechallenge/getTrackMetadata');

    useEffect(() => {
        if (isrc) {
            const fetchTrack = async () => {
                dispatch(fetchTrackRequest());
                try {
                    await fetchMetadata({isrc});
                    dispatch(fetchTrackSuccess({
                        metadata: metadataData
                    }));
                } catch (error) {
                    dispatch(fetchTrackFailure(error.message || 'Failed to fetch track metadata.'));
                }
            };
    
            fetchTrack();
        }
    }, [isrc]);

    return (
        <div>
            {metadataData ? (
                <div>
                    <h2>{metadataData.name}</h2>
                    <p><strong>Artist:</strong> {metadataData.artistName}</p>
                    <p><strong>Album:</strong> {metadataData.albumName}</p>
                    <p><strong>Explicit:</strong> {metadataData.isExplicit ? 'Yes' : 'No'}</p>
                    <p><strong>Playback Seconds:</strong> {metadataData.playbackSeconds}</p>
                    <CoverImage isrc={metadataData.isrc} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TrackMetadata;