import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import TrackMetadata from './components/TrackMetadata';
import './App.css';
import ErrorComponent from './components/ErrorComponent';

const App = () => {
    const [error, setError] = useState(null);

    return (
        <Router>
            <div>
                <h1>Tracks Search</h1>
                {error && <ErrorComponent message={error} />}
                <Routes>
                    <Route path="/" element={<SearchForm setError={ErrorComponent} />} />
                    <Route
                        path="/track/:isrc"
                        element={<TrackMetadata setError={ErrorComponent} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;