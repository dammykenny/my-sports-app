import React from "react";

const PlayerStats = ({ milestones }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Player Milestones</h2>
      {milestones && milestones.length > 0 ? (
        <ul>
          {milestones.map((milestone, index) => (
            <li key={index} className="mb-2">
              <strong>{milestone.strMilestone}:</strong> {milestone.strDescription}
            </li>
          ))}
        </ul>
      ) : (
        <p>No milestones available.</p>
      )}
    </div>
  );
};

export default PlayerStats;
