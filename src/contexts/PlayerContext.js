// src/contexts/PlayerContext.js
import React, { createContext, useState, useContext } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState(null);

  return (
    <PlayerContext.Provider value={{ playerId, setPlayerId }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
