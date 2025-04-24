// src/pages/PlayerSearch.js
import React, { useState } from 'react';
import { searchPlayerByName } from '../services/sportsAPI';
import PlayerOverview from '../components/PlayerOverview';

const PlayerSearch = () => {
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a player name.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSelectedPlayer(null); // Reset selected player
      const results = await searchPlayerByName(query);
      if (results && results.length > 0) {
        setPlayers(results);
      } else {
        setPlayers([]);
        setError('No players found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch player data.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    setPlayers([]); // Clear player search results
    setQuery(''); // Clear input field if you want
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search player..."
          className="border p-2 rounded w-full sm:w-auto flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-gray-500">Searching...</div>}

      {!selectedPlayer && (
        <div className="grid gap-4">
          {players.map((player) => (
            <div
            key={player.idPlayer}
            className="p-4 border rounded hover:bg-gray-100 cursor-pointer flex items-center space-x-4"
            onClick={() => handleSelectPlayer(player)}
          >
            <img
              src={
                player.strCutout ||
                player.strThumb ||
                'https://via.placeholder.com/40x40?text=No+Image'
              }
              alt={player.strPlayer}
              className="w-16 h-16 rounded-full object-cover bg-gray-200 flex-shrink-0"
            />
            <div>
              <h3 className="text-md font-medium">{player.strPlayer}</h3>
              <p className="text-sm text-gray-600">{player.strTeam}</p>
            </div>
          </div>
          
          ))}
        </div>
      )}

      {selectedPlayer && (
        <div className="mt-6">
          <PlayerOverview playerId={selectedPlayer.idPlayer} eventId={eventId} />
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
