// src/services/sportsAPI.js
import axios from 'axios';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const searchPlayerByName = async (playerName) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchplayers.php?p=${encodeURIComponent(playerName)}`);
    return response.data.player || []; // Returns array of matching players
  } catch (error) {
    console.error('Error searching player:', error.message);
    throw error;
  }
};

export const getPlayerHonours = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookuphonours.php?id=${playerId}`);
    return response.data.honours || [];
  } catch (error) {
    console.error('Error fetching player honours:', error.message);
    throw error;
  }
};

export const getPlayerMilestones = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupmilestones.php?id=${playerId}`);
    return response.data.milestones || [];
  } catch (error) {
    console.error('Error fetching player milestones:', error.message);
    throw error;
  }
};

export const getPlayerFormerTeams = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupformerteams.php?id=${playerId}`);
    return response.data.formerTeams || [];
  } catch (error) {
    console.error('Error fetching player former teams:', error.message);
    throw error;
  }
};

export const getPlayerContracts = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupcontracts.php?id=${playerId}`);
    return response.data.contracts || [];
  } catch (error) {
    console.error('Error fetching player contracts:', error.message);
    throw error;
  }
};

export const getEventPlayerResults = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventresults.php?id=${eventId}`);
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching event results:', error.message);
    throw error;
  }
};