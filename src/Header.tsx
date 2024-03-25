import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ApiKeyModal from './components/ApiKeyModal';
import { useMutation } from 'react-query';
import { updateSummonerRequest } from './api/summoner';

const Header = ({
  handleUpdate,
  handleSearch,
}: {
  handleUpdate: () => void;
  handleSearch: (gameName: string, tagLine: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const gameNameParam = searchParams.get('gameName');
  const tagLineParam = searchParams.get('tagLine');

  return (
    <HeaderContainer>
      <h1>칼바람 나락 기여도 랭킹</h1>
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            name: { value: string };
          };
          if (!target.name.value) return;
          if (target.name.value === '@api') {
            setVisible(true);
            return;
          }
          if (target.name.value.includes('#')) {
            const [gameName, tagLine] = target.name.value.split('#');

            setSearchParams({
              gameName,
              tagLine,
            });
            handleSearch(gameName, tagLine);
          } else {
            const tagLine = 'KR1';

            const gameName = target.name.value;
            setSearchParams({
              gameName,
              tagLine,
            });
            handleSearch(gameName, tagLine);
          }
        }}
      >
        <SearchInput
          defaultValue={
            gameNameParam && tagLineParam
              ? gameNameParam + '#' + tagLineParam
              : ''
          }
          placeholder="소환사 이름 + #tag"
          type="text"
          name={'name'}
        />
        <SearchButton type={'submit'}>검색</SearchButton>
        {gameNameParam && (
          <SearchButton
            type={'button'}
            onClick={async () => {
              handleUpdate();
            }}
          >
            전적갱신
          </SearchButton>
        )}
      </SearchForm>
      <ApiKeyModal visible={visible} onClose={() => setVisible(false)} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 50%;
  font-size: 1.4rem;
`;

const SearchButton = styled.button`
  width: 100px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: dodgerblue;
  cursor: pointer;
`;

export default Header;
