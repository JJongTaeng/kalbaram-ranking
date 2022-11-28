import axios from "axios";

export enum API_PATH {
  GET_SUMMONER= '/api/riot/summoner',
  GET_MATCH_LIST = '/api/riot/match-list',
  GET_MATCH_DETAIL = '/api/riot/match-detail',
  SET_API_KEY = '/api/riot/api-key',
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});