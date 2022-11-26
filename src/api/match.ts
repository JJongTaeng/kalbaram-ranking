import { api, API_PATH } from './index';

export const getMatchListRequest = (puuid: string) => {
  return api.post(API_PATH.GET_MATCH_LIST, {
    puuid,
  })
}

export const getMatchDetailRequest = (matchId: string) => {
  return api.post(API_PATH.GET_MATCH_DETAIL, {
    matchId,
  })
}