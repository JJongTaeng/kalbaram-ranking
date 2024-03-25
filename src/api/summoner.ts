import { api, API_PATH } from './index';
import { AxiosError, AxiosResponse } from 'axios';
import { MatchDetail } from '../store/match';

export const searchSummonerRequest = async (
  gameName: string,
  tagLine: string,
): Promise<AxiosResponse<MatchDetail[][]>> => {
  try {
    return await api.get(API_PATH.SEARCH_SUMMONER + `/${gameName}/${tagLine}`);
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const updateSummonerRequest = async (
  gameName: string,
  tagLine: string,
) => {
  try {
    return await api.post(API_PATH.UPDATE_SUMMONER + `/${gameName}/${tagLine}`);
  } catch (e: any) {
    throw new AxiosError(e);
  }
};
