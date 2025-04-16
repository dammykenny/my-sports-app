// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import PlayerSearch from './pages/PlayerSearch'; // updated import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PlayerSearch />} /> {/* updated route */}
          <Route path="stats" element={<div className="p-4">Stats Page Coming Soon</div>} />
          <Route path="trophies" element={<div className="p-4">Trophies Page Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
