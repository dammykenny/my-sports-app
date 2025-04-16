import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TeamContext } from './contexts/PlayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Provide default empty values if needed
const AppWrapper = () => {
  const [favoritePlayers, setFavoritePlayers] = React.useState([]);

  return (
    <TeamContext.Provider value={{ favoritePlayers, setFavoritePlayers }}>
      <App />
    </TeamContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
