import axios from "axios";

export enum API_PATH {
  GET_SUMMONER= '/api/riot/summoner',
  GET_MATCH_LIST = '/api/riot/match-list',
  GET_MATCH_DETAIL = '/api/riot/match-detail',
}

export const api = axios.create({
  headers: {
    'X-Riot-Token': 'RGAPI-3e97c5df-f4ca-4057-afae-72e1490d6207',
  }
});