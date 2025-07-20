import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/country/:name" element={<DetailScreen />} />
            </Routes>
        </Router>
    );
};

export default App;