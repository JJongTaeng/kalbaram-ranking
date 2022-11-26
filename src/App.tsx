import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import MatchList from "./MatchList";
import styled from "@emotion/styled";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header>
        <h1>칼바람 나락 기여도 랭킹</h1>
        <SearchForm onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            name: { value: string };
          };
          if(!target.name.value) return;
          navigate(target.name.value);
        }}>
          <SearchInput placeholder='소환사 이름 입력' type='text' name={'name'}/>
          <SearchButton type={'submit'}>검색</SearchButton>
        </SearchForm>
      </Header>
      <Routes>
        <Route path='/:summonerName' element={<MatchList/>}/>
      </Routes>
    </div>
  );
}

const Header = styled.header`
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

export default App;
