import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import TrackMetadata from './components/TrackMetadata';
import 'antd/dist/reset.css';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />}>
                <Route index element={<Login />} />
                <Route path="*" element={<Login />} />
                <Route
                    exact
                    index={true}
                    path="login"
                    element={<Login />}
                />
                <Route
                    exact
                    path="search"
                    element={<SearchForm />}
                />
                <Route
                    exact
                    path="track/:isrc"
                    element={<TrackMetadata />}
                />
            </Route>
        </Routes>
    );
};

export default App;