import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PlayerContext } from "./contexts/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Provide default empty values if needed
const AppWrapper = () => {
  const [favoritePlayers, setFavoritePlayers] = React.useState([]);

  return (
    <PlayerContext.Provider value={{ favoritePlayers, setFavoritePlayers }}>
      <App />
    </PlayerContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);
