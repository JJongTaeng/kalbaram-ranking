import React from 'react';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import { MatchDetail } from '../store/match';
import { PacmanLoader } from 'react-spinners';

const MatchList = ({
  gameName,
  tagLine,
  refetch,
  error,
  matchDetailList,
  loading,
}: {
  gameName: string;
  tagLine: string;
  refetch: () => void;
  matchDetailList?: MatchDetail[][];
  error: any;
  loading: boolean;
}) => {
  const calcScore = (participant: MatchDetail) => {
    return (
      participant?.totalDamageDealtToChampions +
      participant.totalDamageTaken * 0.2 +
      participant.totalHeal * 0.1
    );
  };

  return (
    <Container>
      {loading && (
        <Center>
          <PacmanLoader size={25} />
        </Center>
      )}
      {error?.message?.response?.status === 404 && (
        <Center>소환사를 찾지 못했습니다.</Center>
      )}
      {!gameName && <Center>소환사 이름을 입력해주세요.</Center>}
      {matchDetailList?.map((matchDetail) => {
        const myTeamId = matchDetail.filter(
          (participant) =>
            participant.summoner.gameName.toLowerCase() ===
            gameName.replaceAll(' ', '').toLowerCase(),
        )?.[0]?.teamId;

        return (
          <>
            <GameContainer key={nanoid()}>
              {matchDetail
                .filter((participant) => participant.teamId === myTeamId)
                .sort(
                  (participant1, participant2) =>
                    calcScore(participant2) - calcScore(participant1),
                )
                .map((participant, index) => {
                  return (
                    <SummonerCard key={nanoid()}>
                      <Img
                        src={`https://opgg-static.akamaized.net/meta/images/lol/champion/${participant.championName}.png`}
                      />
                      <SummonerName>
                        {participant?.summoner.gameName}
                      </SummonerName>
                      <Ranking>{index + 1}등</Ranking>
                      <TotalAmount>
                        {calcScore(participant).toFixed()}
                      </TotalAmount>
                    </SummonerCard>
                  );
                })}
            </GameContainer>
          </>
        );
      })}
    </Container>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  box-sizing: border-box;
`;

const GameContainer = styled.div`
  display: flex;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: mintcream;
  padding: 16px 32px;
  justify-content: center;
  margin: 1rem;
`;

const SummonerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const SummonerName = styled.div`
  font-size: 1.2rem;
  padding: 4px 0;
`;

const Ranking = styled.div`
  color: dodgerblue;
  padding: 4px 0;
`;

const TotalAmount = styled.div`
  color: crimson;
`;

const Img = styled.img`
  border-radius: 50%;
`;

export default MatchList;
