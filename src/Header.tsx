import React, { useState } from 'react';
import styled from "@emotion/styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiKeyModal from "./components/ApiKeyModal";

interface HeaderProps  {
  setSearchParams: any;
}

const Header = ({ setSearchParams }: HeaderProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <HeaderContainer>
      <h1>칼바람 나락 기여도 랭킹</h1>
      <SearchForm onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          name: { value: string };
        };
        if(!target.name.value) return;
        if(target.name.value === '@api') {
          setVisible(true);
          return;
        }
        setSearchParams({ summonerName: target.name.value });
      }}>
        <SearchInput placeholder='소환사 이름 입력' type='text' name={'name'}/>
        <SearchButton type={'submit'}>검색</SearchButton>
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
`

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const SearchInput = styled.input`
  height: 40px;
  width: 50%;
  font-size: 1.4rem;
`

const SearchButton = styled.button`
  width: 100px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: dodgerblue;
  cursor: pointer;
`

export default Header;