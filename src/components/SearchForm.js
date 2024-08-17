import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ setTrackData }) => {
    const [isrc, setIsrc] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/codechallenge/createTrack?isrc=${isrc}`);
            navigate(`/track/${isrc}`);
        } catch (error) {
            console.log('Failed to create track. Please try again.');
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