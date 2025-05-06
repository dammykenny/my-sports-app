import React from "react";

const PlayerTrophies = ({ honours }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Trophies</h2>
      {honours && honours.length > 0 ? (
        <ul>
          {honours.map((honour, index) => (
            <li key={index} className="mb-2">
              🏆 {honour.strHonour} - {honour.strTeam} ({honour.intYear})
            </li>
          ))}
        </ul>
      ) : (
        <p>No trophies found.</p>
      )}
    </div>
  );
};

export default PlayerTrophies;
