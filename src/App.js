import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import TrackMetadata from './components/TrackMetadata';
import './App.css';
import Home from './components/Home';
import LoginSuccess from './components/LoginSuccess';

const App = () => {

    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/loginSuccess" element={<LoginSuccess />} />
                    <Route
                        path="/search"
                        exact
                        element={<SearchForm />}
                    />
                    <Route
                        path="/track/:isrc"
                        element={<TrackMetadata />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;