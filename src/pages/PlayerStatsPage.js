import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerMilestones } from "../services/sportsAPI";
import PlayerStats from "../components/PlayerStats";

const PlayerStatsPage = () => {
  const { id: playerId } = useParams();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPlayerMilestones(playerId);
        setMilestones(data);
      } catch (err) {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    if (playerId) {
      fetchData();
    }
  }, [playerId]); // Include playerId in the dependency array

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (loading) return <div className="p-4">Loading stats...</div>;

  return <PlayerStats milestones={milestones} />;
};

export default PlayerStatsPage;
