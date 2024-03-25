import { atom } from 'recoil';

export interface MatchDetail {
  id: number;
  matchDetailId: string;
  gameEndDate: string;
  gameMode: string;
  teamId: number;
  win: boolean;
  championName: string;
  kills: number;
  assists: number;
  deaths: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalHeal: number;
  createdAt: string;
  updatedAt: string;
  summoner: {
    puuid: string;
    gameName: string;
    tagLine: string;
    id: number;
    matchUpdateDate: string;
    createdAt: string;
    updatedAt: string;
  };
}
