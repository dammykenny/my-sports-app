// src/pages/PlayerPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerOverview from '../components/PlayerOverview';
import PlayerStats from '../components/PlayerStats';
import PlayerTrophies from '../components/PlayerTrophies';
import { getPlayerHonours, getPlayerMilestones } from '../services/sportsAPI';

const PlayerPage = () => {
  const { id: playerId, eventId } = useParams();

  const [honours, setHonours] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      setError('');

      try {
        const [honoursData, milestonesData] = await Promise.all([
          getPlayerHonours(playerId),
          getPlayerMilestones(playerId),
        ]);

        setHonours(honoursData);
        setMilestones(milestonesData);
      } catch (err) {
        setError('Failed to load player data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerData();
    }
  }, [playerId]);

  if (loading) {
    return <div className="p-4">Loading player data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <PlayerOverview playerId={playerId} eventId={eventId} />
      <PlayerStats news={milestones} />
      <PlayerTrophies scores={honours} />
    </div>
  );
};

export default PlayerPage;
