import React, { useState, useContext } from 'react';
import { TeamContext } from '../contexts/PlayerContext';
import PlayerOverview from '../components/PlayerOverview';
import { searchPlayerByName } from '../services/sportsAPI';

const PlayerSearch = () => {
  const { favoritePlayers, setFavoritePlayers } = useContext(TeamContext);
  const [playerInput, setPlayerInput] = useState('');
  const [eventInput, setEventInput] = useState('');
  const [searchError, setSearchError] = useState(null);

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!playerInput.trim()) return;

    try {
      const players = await searchPlayerByName(playerInput.trim());
      if (players.length > 0) {
        const playerId = players[0].idPlayer;
        const isAlreadyAdded = favoritePlayers.some(p => p.id === playerId);
        if (!isAlreadyAdded) {
          setFavoritePlayers([...favoritePlayers, { id: playerId, eventId: eventInput.trim() || null }]);
          setPlayerInput('');
          setEventInput('');
          setSearchError(null);
        } else {
          setSearchError('Player already added.');
        }
      } else {
        setSearchError('No player found with that name.');
      }
    } catch (err) {
      console.error(err);
      setSearchError('Error searching for player. Try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Player Information & Event Results</h1>

      <form onSubmit={handleAddPlayer} className="mb-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          value={playerInput}
          onChange={(e) => setPlayerInput(e.target.value)}
          placeholder="Enter Player Name (e.g., Edenilson)"
          className="border p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          placeholder="Enter Event ID (optional)"
          className="border p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Add Player
        </button>
      </form>

      {searchError && <p className="text-red-500 text-center mb-4">{searchError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritePlayers.map((player) => (
          <PlayerOverview
            key={player.id}
            playerId={player.id}
            eventId={player.eventId}
          />
        ))}
      </div>

      {favoritePlayers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No players added yet. Start by adding one!</p>
      )}
    </div>
  );
};

export default PlayerSearch;
