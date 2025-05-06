// src/services/sportsAPI.js
const API_BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

// Search for a player by name
export const searchPlayerByName = async (name) => {
  console.log("Searching for player:", name);
  try {
    const response = await fetch(
      `${API_BASE_URL}/searchplayers.php?p=${encodeURIComponent(name)}`
    );
    const data = await response.json();
    console.log("Search results:", data);
    return data.player || [];
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

// Get full details of a player by ID
export const getPlayerById = async (playerId) => {
  console.log("Fetching player by ID:", playerId);
  try {
    const response = await fetch(`${API_BASE_URL}/lookupplayer.php?id=${playerId}`);
    const data = await response.json();
    console.log("Player data:", data);
    return data.players?.[0] || null;
  } catch (error) {
    console.error("Error fetching player by ID:", error);
    return null;
  }
};

// Get all honours (trophies) for a player
export const getPlayerHonours = async (playerId) => {
  console.log("Fetching honours for player:", playerId);
  try {
    const response = await fetch(`${API_BASE_URL}/lookuphonours.php?id=${playerId}`);
    const data = await response.json();
    console.log("Honours data:", data);
    return data.honours || [];
  } catch (error) {
    console.error("Error fetching honours:", error);
    return [];
  }
};

// Get all career milestones for a player
export const getPlayerMilestones = async (playerId) => {
  console.log("Fetching milestones for player:", playerId);
  try {
    const response = await fetch(`${API_BASE_URL}/lookupmilestones.php?id=${playerId}`);
    const data = await response.json();
    console.log("Milestones data:", data);
    return data.milestones || [];
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return [];
  }
};

// Get all former teams a player has played for
export const getPlayerFormerTeams = async (playerId) => {
  console.log("Fetching former teams for player:", playerId);
  try {
    const response = await fetch(`${API_BASE_URL}/lookupformerteams.php?id=${playerId}`);
    const data = await response.json();
    console.log("Raw former teams data:", data);
    const teams = data.formerteams || [];

    const filteredTeams = teams
      .filter(
        (team) =>
          team?.strTeam &&
          team.strTeam.trim() !== "" &&
          team.strTeam !== "Unknown Team"
      )
      .filter(
        (team, index, self) =>
          index === self.findIndex((t) => t.strTeam === team.strTeam)
      );

    console.log("Filtered former teams:", filteredTeams);
    return filteredTeams;
  } catch (error) {
    console.error("Error fetching former teams:", error);
    return [];
  }
};

// Get player contract history
export const getPlayerContracts = async (playerId) => {
  console.log("Fetching contracts for player:", playerId);
  try {
    const response = await fetch(`${API_BASE_URL}/lookupcontracts.php?id=${playerId}`);
    const data = await response.json();
    let contracts = data.contracts || [];

    console.log("Contracts data:", contracts);

    if (contracts.length === 0) {
      console.log("No contracts found, falling back to transfer history...");
      const fallback = await fetch(`${API_BASE_URL}/lookuptransfers.php?id=${playerId}`);
      const fallbackData = await fallback.json();
      const transfers = fallbackData.transfers || [];
      console.log("Fallback transfers data:", transfers);

      contracts = transfers.map((transfer) => ({
        strTeam: transfer.strTeam,
        dateStart: transfer.dateFrom || null,
        dateEnd: transfer.dateTo || null,
      }));
    }

    const filteredContracts = contracts.filter(
      (contract) => contract.strTeam && contract.strTeam.trim() !== ""
    );

    console.log("Final contract list:", filteredContracts);
    return filteredContracts;
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return [];
  }
};

// Get recent match events involving a player's team
export const getPlayerEventResults = async (playerId, teamId) => {
  if (!teamId || teamId === "default") {
    console.warn("Invalid team ID for event results:", teamId);
    return [];
  }

  console.log(`Fetching recent events for team ID: ${teamId} (playerId: ${playerId})`);
  try {
    const response = await fetch(`${API_BASE_URL}/eventslast.php?id=${teamId}`);
    const data = await response.json();
    console.log("Event results:", data);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching player event results:", error);
    return [];
  }
};

// Get full details of a team by ID
export const getTeamById = async (teamId) => {
  console.log("Fetching team by ID:", teamId);
  try {
    const response = await fetch(`${API_BASE_URL}/lookupteam.php?id=${teamId}`);
    const data = await response.json();
    console.log("Team data:", data);
    return data.teams?.[0] || null;
  } catch (error) {
    console.error(`Error fetching team ${teamId}:`, error);
    return null;
  }
};
