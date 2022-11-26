import { atom } from "recoil";

export interface SummonerInfo {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

export const summonerAtom = atom<SummonerInfo>({
  key: 'summonerAtom',
  default: {
    accountId: '',
    id: '',
    name: '',
    profileIconId: 0,
    puuid: '',
    revisionDate: 0,
    summonerLevel: 0,
  }
})