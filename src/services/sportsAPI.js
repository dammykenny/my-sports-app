// src/services/sportsAPI.js
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

// ✅ Search players by name
export const searchPlayerByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/searchplayers.php?p=${encodeURIComponent(name)}`);
    const data = await response.json();
    return data.player || [];
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

// ✅ Get player honours
export const getPlayerHonours = async (playerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookuphonours.php?id=${playerId}`);
    const data = await response.json();
    return data.honours || [];
  } catch (error) {
    console.error('Error fetching honours:', error);
    return [];
  }
};

// ✅ Get player milestones
export const getPlayerMilestones = async (playerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookupmilestones.php?id=${playerId}`);
    const data = await response.json();
    return data.milestones || [];
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return [];
  }
};

// ✅ Get former teams
export const getPlayerFormerTeams = async (playerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookupformerteams.php?id=${playerId}`);
    const data = await response.json();
    return data.formerteams || [];
  } catch (error) {
    console.error('Error fetching former teams:', error);
    return [];
  }
};

// ✅ Get contracts
export const getPlayerContracts = async (playerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookupcontracts.php?id=${playerId}`);
    const data = await response.json();
    return data.contracts || [];
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return [];
  }
};

// ✅ Get event results
export const getEventPlayerResults = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/eventresults.php?id=${eventId}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching event results:', error);
    return [];
  }
};
