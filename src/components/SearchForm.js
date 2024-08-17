import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';

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
        e.preventDefault();
        await fetchTrack({isrc});
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