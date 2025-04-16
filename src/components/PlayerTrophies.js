// src/components/PlayerTrophies.js
import React from 'react';

const PlayerTrophies = ({ scores = [] }) => {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Match Scores</h3>

      {scores.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {scores.map((score) => (
            <li key={score.id}>
              <span className="font-medium">{score.strEvent}:</span>{' '}
              {score.intHomeScore} - {score.intAwayScore}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recent scores available.</p>
      )}
    </div>
  );
};

export default PlayerTrophies;
