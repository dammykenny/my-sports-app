import React, { createContext, useState } from 'react';

// 1️⃣ Create the context
export const TeamContext = createContext();

// 2️⃣ Create the provider component
export const TeamProvider = ({ children }) => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  return (
    <TeamContext.Provider value={{ favoritePlayers, setFavoritePlayers }}>
      {children}
    </TeamContext.Provider>
  );
};
