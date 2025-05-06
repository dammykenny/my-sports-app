// src/pages/PlayerPage.js
import React from "react";
import { useParams } from "react-router-dom";
import PlayerOverview from "../components/PlayerOverview";

const PlayerPage = () => {
  const { id: playerId } = useParams();

  return (
    <div className="p-4">
      <PlayerOverview playerId={playerId} />
    </div>
  );
};

export default PlayerPage;
