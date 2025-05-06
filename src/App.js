// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import PlayerPage from './pages/PlayerPage';
import PlayerSearch from './pages/PlayerSearch';
import PlayerStatsPage from './pages/PlayerStatsPage';
import PlayerTrophiesPage from './pages/PlayerTrophiesPage';
import { PlayerProvider } from './contexts/PlayerContext';

const App = () => {
  return (
    <PlayerProvider>
      <Router basename="/my-sports-app">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PlayerSearch />} />
            <Route path="/player/:id/:eventId" element={<PlayerPage />} />
            <Route path="/stats/:id" element={<PlayerStatsPage />} />
            <Route path="/trophies/:id" element={<PlayerTrophiesPage />} />
          </Route>
        </Routes>
      </Router>
    </PlayerProvider>
  );
};

export default App;