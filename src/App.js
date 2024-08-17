import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import TrackMetadata from './components/TrackMetadata';
import './App.css';
import { useSelector } from 'react-redux';
import ErrorComponent from './components/ErrorComponent';

const App = () => {
    const { status, error } = useSelector((state) => state.track);

    return (
        <Router>
            <div>
                <h1>Tracks Search</h1>
                {status === 'failed' && <ErrorComponent message={error} />}
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