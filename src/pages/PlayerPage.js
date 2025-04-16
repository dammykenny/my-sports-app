import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerOverview from '../components/PlayerOverview';
import PlayerStats from '../components/PlayerStats';
import PlayerTrophies from '../components/PlayerTrophies';

const PlayerPage = () => {
  const { id: playerId, eventId } = useParams();

  // Replace these with actual fetched data later
  const [news] = useState([
    { id: '1', strDescriptionEN: 'Player signed a new contract with Real Madrid.' },
    { id: '2', strDescriptionEN: 'Player hit 100 career goals milestone!' },
  ]);

  const [scores] = useState([
    { id: '1', strEvent: 'Real Madrid vs Barcelona', intHomeScore: 2, intAwayScore: 1 },
    { id: '2', strEvent: 'Real Madrid vs Atletico', intHomeScore: 3, intAwayScore: 0 },
  ]);

  return (
    <div>
      <PlayerOverview playerId={playerId} eventId={eventId} />
      <PlayerStats news={news} />
      <PlayerTrophies scores={scores} />
    </div>
  );
};

export default PlayerPage;
