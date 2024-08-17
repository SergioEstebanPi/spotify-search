import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const TrackMetadata = () => {
    const [track, setTrack] = useState(null);
    const {isrc} = useParams();

    useEffect(() => {
        if(isrc){
            const fetchTrack = async () => {
                try {
                    let headers = {
                        'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='
                    }
                    const response = await axios.get(`http://localhost:8080/codechallenge/getTrackMetadata?isrc=${isrc}`, {
                        headers: headers
                    });
                    setTrack(response.data);
                } catch (error) {
                    console.log('Failed to fetch track metadata.');
                }
            };
    
            fetchTrack();
        }
    }, [isrc]);

    return (
        <div>
            {track ? (
                <div>
                    <h2>{track.name}</h2>
                    <p><strong>Artist:</strong> {track.artistName}</p>
                    <p><strong>Album:</strong> {track.albumName}</p>
                    <p><strong>Explicit:</strong> {track.isExplicit ? 'Yes' : 'No'}</p>
                    <p><strong>Playback Seconds:</strong> {track.playbackSeconds}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TrackMetadata;