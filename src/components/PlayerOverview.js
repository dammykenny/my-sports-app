// src/components/PlayerOverview.js
import React, { useState, useEffect } from 'react';
import { 
  getPlayerHonours, 
  getPlayerMilestones, 
  getPlayerFormerTeams, 
  getPlayerContracts, 
  getEventPlayerResults 
} from '../services/sportsAPI';


const PlayerOverview = ({ playerId, eventId }) => {
  const [honours, setHonours] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [formerTeams, setFormerTeams] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          honoursData, 
          milestonesData, 
          formerTeamsData, 
          contractsData, 
          eventResultsData
        ] = await Promise.all([
          getPlayerHonours(playerId),
          getPlayerMilestones(playerId),
          getPlayerFormerTeams(playerId),
          getPlayerContracts(playerId),
          eventId ? getEventPlayerResults(eventId) : Promise.resolve([]),
        ]);

        setHonours(honoursData);
        setMilestones(milestonesData);
        setFormerTeams(formerTeamsData);
        setContracts(contractsData);
        setEventResults(eventResultsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load player data.');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchData();
    }
  }, [playerId, eventId]);

  if (loading) return <div className="p-4 text-center">Loading player info...</div>;
  if (error) return <div className="p-4 text-red-600 text-center">{error}</div>;

  const Section = ({ title, data, renderItem }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">{title}:</h3>
      {data.length > 0 ? (
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          {data.map(renderItem)}
        </ul>
      ) : (
        <p className="text-gray-500">No {title.toLowerCase()} available.</p>
      )}
    </div>
  );

  return (
    <div className="p-4 border rounded-md bg-white shadow">
      <h2 className="text-2xl font-bold mb-6">
        Player Overview - {honours[0]?.strPlayer || `Player ID: ${playerId}`}
      </h2>

      <Section
        title="Honours"
        data={honours}
        renderItem={(honour) => (
          <li key={honour.id}>
            {honour.strHonour} - {honour.strTeam} ({honour.strSeason})
          </li>
        )}
      />

      <Section
        title="Milestones"
        data={milestones}
        renderItem={(milestone) => (
          <li key={milestone.id}>
            {milestone.strMilestone} - {milestone.strSeason}
          </li>
        )}
      />

      <Section
        title="Former Teams"
        data={formerTeams}
        renderItem={(team) => (
          <li key={team.id}>{team.strTeam}</li>
        )}
      />

      <Section
        title="Contracts"
        data={contracts}
        renderItem={(contract) => (
          <li key={contract.id}>
            {contract.strTeam} ({contract.strStart} - {contract.strEnd})
          </li>
        )}
      />

      <Section
        title="Event Results"
        data={eventResults}
        renderItem={(result) => (
          <li key={result.id}>
            {result.strEvent} - {result.strResult}
          </li>
        )}
      />
    </div>
  );
};

export default PlayerOverview;
