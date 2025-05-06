// src/components/PlayerOverview.js
import React, { useEffect, useState } from "react";
import {
  getPlayerById,
  getPlayerFormerTeams,
  getPlayerContracts,
  getPlayerEventResults,
} from "../services/sportsAPI";
import countries from "i18n-iso-countries";
import "i18n-iso-countries/langs/en.json";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const PlayerOverview = ({ playerId }) => {
  const [player, setPlayer] = useState(null);
  const [formerTeams, setFormerTeams] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [eventResults, setEventResults] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const playerData = await getPlayerById(playerId);
        setPlayer(playerData);

        if (playerData?.idPlayer) {
          const [
            fetchedFormerTeams,
            fetchedContracts,
            fetchedEventResults,
          ] = await Promise.all([
            getPlayerFormerTeams(playerData.idPlayer),
            getPlayerContracts(playerData.idPlayer),
            getPlayerEventResults(playerData.idPlayer, playerData.idTeam),
          ]);

          console.log("Raw Former Teams:", fetchedFormerTeams);

          const cleanedFormerTeams =
            fetchedFormerTeams?.filter(
              (team) =>
                team.strTeam &&
                team.strTeam.trim() !== "" &&
                team.strTeam !== "Unknown Team"
            ) || [];

          const finalFormerTeams =
            cleanedFormerTeams.length > 0
              ? cleanedFormerTeams
              : fetchedContracts?.map((contract) => ({
                  strTeam: contract.strTeam,
                })) || [];

          setFormerTeams(finalFormerTeams);
          setContracts(fetchedContracts);
          setEventResults(fetchedEventResults);
        }
      } catch (error) {
        console.error("Error loading player data:", error);
      }
    };

    if (playerId) loadData();
  }, [playerId]);

  if (!player)
    return <div className="text-gray-500">Loading player overview...</div>;

  const countryCode = countries.getAlpha2Code(player.strNationality, "en");
  const flagUrl = countryCode
    ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
    : null;

  const getAge = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 space-y-6 text-gray-800">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-blue-700">Player Overview</h2>

      {/* Header Section */}
      <div className="flex gap-6 items-start">
        {player.strThumb && (
          <img
            src={player.strThumb}
            alt={player.strPlayer}
            className="w-28 h-28 rounded-full object-cover shadow"
          />
        )}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{player.strPlayer}</h3>
          <p className="text-gray-600">{player.strPosition}</p>
          <p className="flex items-center text-sm text-gray-700">
            {flagUrl && (
              <img
                src={flagUrl}
                alt={player.strNationality}
                className="w-5 h-5 mr-2 rounded-full object-cover"
              />
            )}
            {player.strNationality}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Age:</strong>{" "}
            {player.dateBorn ? getAge(player.dateBorn) : "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Current Team:</strong> {player.strTeam || "N/A"}
          </p>
        </div>
      </div>

      {/* Former Teams */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600">Former Teams</h3>
        {formerTeams.length === 0 ? (
          <p className="text-gray-500 italic">No former teams found.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {formerTeams.map((team, idx) => (
              <li key={idx}>{team.strTeam}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Contracts */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600">Contracts</h3>
        {contracts.length === 0 ? (
          <p className="text-gray-500 italic">No contract details available.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {contracts.map((contract, idx) => (
              <li key={idx}>
                {contract.strTeam} ({contract.dateStart || "N/A"} to{" "}
                {contract.dateEnd || "N/A"})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Event Results */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600">
          Recent Event Results
        </h3>
        {eventResults.length === 0 ? (
          <p className="text-gray-500 italic">
            No recent event data available.
          </p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {eventResults.map((event, idx) => (
              <li key={idx}>
                {event.strEvent} – {event.intHomeScore} : {event.intAwayScore} (
                {event.dateEvent})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Player Bio */}
      {player.strDescriptionEN && (
        <div>
          <h3 className="text-lg font-semibold text-blue-600">Player Bio</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {player.strDescriptionEN}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerOverview;
