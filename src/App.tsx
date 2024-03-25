import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import MatchList from './pages/MatchList';
import Header from './Header';
import styled from '@emotion/styled';
import Setting from './components/Setting';
import ConfigModal from './components/ConfigModal';
import { AxiosResponse } from 'axios';
import { MatchDetail } from './store/match';
import { useMutation, useQuery } from 'react-query';
import { searchSummonerRequest, updateSummonerRequest } from './api/summoner';

function App() {
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameName, setGameName] = useState(searchParams.get('gameName') || '');
  const [tagLine, setTagLine] = useState(searchParams.get('tagLine') || '');

  const {
    data,
    error,
    refetch,
    isLoading,
  }: {
    data: AxiosResponse<MatchDetail[][], any> | undefined;
    error: any;
    refetch: any;
    isLoading: boolean;
  } = useQuery(
    'searchSummonerRequest',
    async () => {
      return await searchSummonerRequest(gameName!, tagLine!);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    },
  );

  const mutation = useMutation(
    'fetch/matchList',
    ({ gameName, tagLine }: { gameName: string; tagLine: string }) =>
      updateSummonerRequest(gameName, tagLine),
  );

  const matchDetailList = useMemo(() => {
    if (error) return;
    return data?.data;
  }, [data, gameName, tagLine, error]);

  useEffect(() => {
    refetch();
  }, [gameName, tagLine]);

  return (
    <div className="App">
      <Header
        handleSearch={(gameName, tagLine) => {
          setGameName(gameName);
          setTagLine(tagLine);
        }}
        handleUpdate={async () => {
          if (!gameName || !tagLine) return;
          setGameName(gameName);
          setTagLine(tagLine);
          await mutation.mutateAsync({ gameName, tagLine });
          refetch();
        }}
      />
      <Routes>
        <Route
          path={`/`}
          element={
            <MatchList
              matchDetailList={matchDetailList}
              error={error}
              refetch={refetch}
              gameName={gameName ?? ''}
              tagLine={tagLine ?? ''}
              loading={mutation.isLoading || isLoading}
            />
          }
        />
      </Routes>
      <FixedContainer onClick={() => setVisible(true)}>
        <Setting width={'2em'} height={'2em'} />
      </FixedContainer>
      <ConfigModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
}

const FixedContainer = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  right: 20px;
  bottom: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  transition: 0.3s;

  svg,
  path {
    fill: dodgerblue;
  }

  &:hover {
    background-color: dodgerblue;

    svg,
    path {
      fill: white;
    }
  }
`;

export default App;
