import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { searchPlayerByName } from "../services/sportsAPI";
import { usePlayer } from "../contexts/PlayerContext"; // import from context
import countries from "i18n-iso-countries";
import "i18n-iso-countries/langs/en.json";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const getCountryCode = (countryName) => {
  if (!countryName) return null;
  return countries.getAlpha2Code(countryName, "en")?.toLowerCase();
};

const PlayerSearch = () => {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Setup navigate

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a player name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const results = await searchPlayerByName(query);
      if (results && results.length > 0) {
        setPlayers(results);
      } else {
        setPlayers([]);
        setError("No players found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch player data.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const { setPlayerId } = usePlayer(); // get from context

  const handleSelectPlayer = (player) => {
    const playerId = player.idPlayer;
    setPlayerId(playerId); // ✅ Save selected player ID to context
    const eventId = player.idSoccerXML || "default";
    navigate(`/player/${playerId}/${eventId}`);
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

      <div className="grid gap-4">
        {players.map((player) => {
          const country = player.strNationality || "Unknown";
          const code = getCountryCode(player.strNationality);

          return (
            <div
              key={player.idPlayer}
              className="flex items-center space-x-4 p-4 border rounded shadow-sm hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handleSelectPlayer(player)}
            >
              {player.strCutout || player.strThumb ? (
                <img
                  src={player.strCutout || player.strThumb}
                  alt={player.strPlayer}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                  {player.strPlayer?.charAt(0)}
                </div>
              )}

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {player.strPlayer}
                  </h3>
                  {code ? (
                    <img
                      src={`https://flagcdn.com/w40/${code}.png`}
                      alt={`${country} flag`}
                      title={country}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="text-xs text-gray-500 italic"
                      title="Nationality not available"
                    >
                      {country}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {player.strTeam || "No team info"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerSearch;
