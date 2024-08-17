import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Tracks Search</h1>
                <Routes>
                    <Route path="/" element={<SearchForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;