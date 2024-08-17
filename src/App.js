import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import TrackMetadata from './components/TrackMetadata';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Tracks Search</h1>
                <Routes>
                    <Route path="/" element={<SearchForm />} />
                    <Route
                        path="/track/:isrc"
                        element={<TrackMetadata />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;