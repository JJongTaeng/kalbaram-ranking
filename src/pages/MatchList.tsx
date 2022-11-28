import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getSummonerRequest } from "../api/summoner";
import { useRecoilState, useRecoilValue } from "recoil";
import { summonerAtom } from "../store/summoner";
import { getMatchDetailRequest, getMatchListRequest } from "../api/match";
import { matchDetailListAtom, matchListAtom } from "../store/match";
import styled from "@emotion/styled";
import { configAtom } from "../store/config";
import LoaderComponent from "../components/LoaderComponent";

const MatchList = () => {
  const { summonerName } = useParams();
  const [summoner, setSummoner] = useRecoilState(summonerAtom);
  const [matchList, setMatchList] = useRecoilState(matchListAtom);
  const [matchDetailMap, setMatchDetailMap] = useRecoilState(matchDetailListAtom);
  const config = useRecoilValue(configAtom);

  const matchListMutation = useMutation('fetch/matchList', (puuid: string) => getMatchListRequest(puuid), {
    onSuccess: res => {
      setMatchList(res.data);
    }
  });

  const matchDetailMutation = useMutation('fetch/matchDetail', (matchId: string) => getMatchDetailRequest(matchId));

  useQuery('fetch/summoner', async () => await getSummonerRequest(summonerName || ''), {
    onSuccess: (res: any) => {
      setSummoner(res.data);
    }
  });

  useEffect(() => {
    if(summoner.puuid) {
      matchListMutation.mutateAsync(summoner.puuid);
    }
  }, [summoner.puuid]);

  useEffect(() => {
    matchList.forEach(async (matchId) => {
      const res = await matchDetailMutation.mutateAsync(matchId);
      const teamId = res.data.info.participants.find((participant: any) => participant.summonerName === summonerName).teamId;
      const matchDetail = res.data.info.participants
        .map((participant: any) => ({
          totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
          totalDamageTaken: participant.totalDamageTaken,
          totalHeal: participant.totalHeal,
          teamId: participant.teamId,
          summonerName: participant.summonerName,
          win: participant.win,
          championName: participant.championName,
          totalAmount: Math.floor(participant.totalDamageDealtToChampions + (participant.totalDamageTaken * config.takenDamageScale) + (participant.totalHeal * config.healScale) )
        }))
        .filter((matchDetail: any) => matchDetail.teamId === teamId);

      setMatchDetailMap((prev) => ({
        ...prev,
        [matchId]: matchDetail.sort((a: any, b: any) => b.totalAmount - a.totalAmount),
      }))
    })
  }, [matchList])

  return matchDetailMutation.isLoading ? <LoaderComponent size={100} color={'dodgerblue'} /> : (
    <Container>
      {
        matchList?.map((matchId) => <>
          <GameContainer key={matchId}>
            {
              matchDetailMap[matchId]?.map((matchDetail, index) => {
                return (
                  <SummonerCard key={index}>
                    <Img src={`https://opgg-static.akamaized.net/meta/images/lol/champion/${matchDetail.championName}.png`} />
                    <SummonerName>
                      {matchDetail?.summonerName}
                    </SummonerName>
                    <Ranking>
                      {index + 1}등
                    </Ranking>
                    <TotalAmount>
                      {matchDetail.totalAmount}
                    </TotalAmount>
                  </SummonerCard>
                );
              })
            }
          </GameContainer>
        </>)
      }
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
`

const GameContainer = styled.div`
  display: flex;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: mintcream;
  padding: 16px 32px;
  justify-content: center;
  margin: 1rem;
`

const SummonerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`

const SummonerName = styled.div`
  font-size: 1.2rem;
  padding: 4px 0;
`

const Ranking = styled.div`
  color: dodgerblue;
  padding: 4px 0;
`

const TotalAmount = styled.div`
  color: crimson;
`

const Img = styled.img`
  border-radius: 50%;
`

export default MatchList;