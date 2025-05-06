import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerHonours } from "../services/sportsAPI";
import PlayerTrophies from "../components/PlayerTrophies";

const PlayerTrophiesPage = () => {
  const { id: playerId } = useParams();
  const [honours, setHonours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPlayerHonours(playerId);
        setHonours(data);
      } catch (err) {
        setError("Failed to load trophies");
      } finally {
        setLoading(false);
      }
    };
    if (playerId) {
      fetchData();
    }
  }, [playerId]); // Include playerId in the dependency array

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (loading) return <div className="p-4">Loading trophies...</div>;

  return <PlayerTrophies honours={honours} />;
};

export default PlayerTrophiesPage;
