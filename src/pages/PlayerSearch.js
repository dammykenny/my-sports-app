import React, { useState } from 'react';
import { searchPlayerByName } from '../services/sportsAPI';
import PlayerOverview from '../components/PlayerOverview';

const PlayerSearch = () => {
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSelectedPlayer(null);

    try {
      const results = await searchPlayerByName(query);
      if (results.length === 0) {
        setError('No players found.');
      }
      setPlayers(results);
    } catch (err) {
      console.error(err);
      setError('Error searching for players.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Search</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter player name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {players.length > 0 && !selectedPlayer && (
        <div className="space-y-4 flex flex-col items-start">
          {players.map((player) => (
            <div
              key={player.idPlayer}
              className="w-full max-w-md border p-4 rounded hover:bg-gray-100 shadow transition"
            >
              <div
                onClick={() => setSelectedPlayer(player)}
                className="group"
              >
                <p className="font-semibold text-lg group-hover:underline cursor-pointer">
                  {player.strPlayer}
                </p>
                <p className="text-sm text-gray-600 group-hover:text-black cursor-pointer">
                  {player.strTeam}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPlayer && (
        <div className="mt-6">
          <PlayerOverview playerId={selectedPlayer.idPlayer} />
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
