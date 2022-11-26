import { atom } from "recoil";

export interface MatchDetail {
  totalDamageDealtToChampions: number; // 가한 피해량
  totalDamageTaken: number; // 받은 피해량
  totalHeal: number; // 힐량
  teamId: number; // team
  summonerName: string; // 소환사 이름
  win: boolean; // 승리 여부
  championName: string;
  totalAmount: number;
}

export interface MatchDetailListMap {
  [key: string]: MatchDetail[];
}


export const matchListAtom = atom<string[]>({
  key: 'matchListAtom',
  default: [],
});

export const matchDetailListAtom = atom<MatchDetailListMap>({
  key: 'matchDetailListAtom',
  default: {}
})