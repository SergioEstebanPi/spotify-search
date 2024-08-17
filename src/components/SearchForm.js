import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import { fetchTrackFailure, fetchTrackRequest, fetchTrackSuccess } from '../features/Track/TrackSlice';

const SearchForm = () => {
    const [isrc, setIsrc] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { metadata, coverImage, status, error } = useSelector((state) => state.track);

    const { data: trackData, loading: trackLoading, error: trackError, fetchData: fetchTrack } = useApi('codechallenge/createTrack', 'POST');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(fetchTrackRequest());
        try {
            await fetchTrack({isrc});
            dispatch(fetchTrackSuccess());
            navigate(`/track/${isrc}`);
        } catch (error) {
            dispatch(fetchTrackFailure(error.message || 'An error occurred'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={isrc}
                onChange={(e) => setIsrc(e.target.value)}
                placeholder="Enter ISRC code"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;