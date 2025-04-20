import React, { useEffect, useState } from 'react';
import {
  getPlayerHonours,
  getPlayerMilestones,
  getPlayerFormerTeams,
  getPlayerContracts,
  getEventPlayerResults,
} from '../services/sportsAPI';

const PlayerOverview = ({ playerId }) => {
  const [honours, setHonours] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [formerTeams, setFormerTeams] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!playerId) return;

    // Reset all data when a new player is selected
    setHonours([]);
    setMilestones([]);
    setFormerTeams([]);
    setContracts([]);
    setEventResults([]);
    setIsLoading(true);

    const fetchPlayerData = async () => {
      try {
        const [
          honoursData,
          milestonesData,
          formerTeamsData,
          contractsData,
          eventsData,
        ] = await Promise.all([
          getPlayerHonours(playerId),
          getPlayerMilestones(playerId),
          getPlayerFormerTeams(playerId),
          getPlayerContracts(playerId),
          getEventPlayerResults(playerId),
        ]);

        setHonours(honoursData || []);
        setMilestones(milestonesData || []);
        setFormerTeams(formerTeamsData || []);
        setContracts(contractsData || []);
        setEventResults(eventsData || []);
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  if (!playerId) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Player Overview</h2>
      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Honours:</h3>
            {honours.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {honours.map((honour, index) => (
                  <li key={index}>
                    {honour.strHonour} - {honour.strTeam} ({honour.strSeason})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No honours available.</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Milestones:</h3>
            {milestones.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {milestones.map((milestone, index) => (
                  <li key={index}>{milestone.strMilestone}</li>
                ))}
              </ul>
            ) : (
              <p>No milestones available.</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Former Teams:</h3>
            {formerTeams.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {formerTeams.map((team, index) => (
                  <li key={index}>{team.strTeam}</li>
                ))}
              </ul>
            ) : (
              <p>No former teams available.</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Contracts:</h3>
            {contracts.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {contracts.map((contract, index) => (
                  <li key={index}>
                    {contract.strTeam} ({contract.dateSigned || ' - '} - {contract.dateEnd || ' - '})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contract info available.</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Event Results:</h3>
            {eventResults.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {eventResults.map((event, index) => (
                  <li key={index}>
                    {event.strEvent} - {event.intGoals} Goals
                  </li>
                ))}
              </ul>
            ) : (
              <p>No event results available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerOverview;
