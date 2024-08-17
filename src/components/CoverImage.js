import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoverImage = ({ isrc }) => {
    const [coverUrl, setCoverUrl] = useState('');

    useEffect(() => {
        const fetchCover = async () => {
            try {
                let headers = {
                    'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='
                }
                const response = await axios.get(`http://localhost:8080/codechallenge/getCover?isrc=${isrc}`, {
                    headers: headers,
                    responseType: 'arraybuffer'
                });
                const binaryDataBuffer = response.data;
                const bufferArray = new Uint8Array(binaryDataBuffer).buffer;
                const blob = new Blob([bufferArray], {
                    type: "image/jpeg",
                });
                const url = URL.createObjectURL(blob);
                setCoverUrl(url)
            } catch (error) {
                console.error('Failed to fetch cover image.');
            }
        };

        fetchCover();
    }, [isrc]);

    return coverUrl ? <img src={coverUrl} alt="Cover" /> : <p>Loading cover image...</p>;
};

export default CoverImage;