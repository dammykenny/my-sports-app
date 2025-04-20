// src/components/PlayerStats.js
import React from 'react';

const PlayerStats = ({ news }) => {
  return (
    <div className="p-4 bg-white shadow rounded my-6">
      <h2 className="text-2xl font-semibold mb-4">Latest News</h2>

      {news && news.length > 0 ? (
        <ul className="space-y-3">
          {news.map((item) => (
            <li key={item.id} className="border-b pb-2">
              <p className="text-gray-800">{item.strDescriptionEN}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No recent news available for this player.</p>
      )}
    </div>
  );
};

export default PlayerStats;
