// src/components/PlayerStats.js
import React from 'react';

const PlayerStats = ({ news = [] }) => {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Latest News</h3>

      {news.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {news.map((item) => (
            <li key={item.id}>
              {item.strDescriptionEN || 'No description available'}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No news available for this player.</p>
      )}
    </div>
  );
};

export default PlayerStats;
