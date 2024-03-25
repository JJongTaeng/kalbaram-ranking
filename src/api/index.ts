import axios from 'axios';

export enum API_PATH {
  SEARCH_SUMMONER = '/api/swordwind/summoner/search',
  UPDATE_SUMMONER = '/api/swordwind/summoner/update',
  SET_API_KEY = '/api/swordwind/api-key',
}

export const api = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
