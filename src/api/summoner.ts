import { api, API_PATH } from "./index";
import { AxiosResponse } from "axios";
import { SummonerInfo } from "../store/summoner";

export const getSummonerRequest = (name: string): Promise<AxiosResponse<SummonerInfo>> => {
  return api.post(API_PATH.GET_SUMMONER, {
    summonerName: name,
  });
}
