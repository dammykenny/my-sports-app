// src/components/PlayerTrophies.js
import React from 'react';

const PlayerTrophies = ({ scores }) => {
  return (
    <div className="p-4 bg-white shadow rounded my-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Match Results</h2>

      {scores && scores.length > 0 ? (
        <ul className="space-y-3">
          {scores.map((match) => (
            <li key={match.id} className="border-b pb-2">
              <p className="text-gray-800 font-medium">{match.strEvent}</p>
              <p className="text-gray-600">
                {match.intHomeScore} - {match.intAwayScore}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No match results available.</p>
      )}
    </div>
  );
};

export default PlayerTrophies;
