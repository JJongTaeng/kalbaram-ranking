import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useSearchParams } from "react-router-dom";
import MatchList from "./pages/MatchList";
import Header from "./Header";
import styled from "@emotion/styled";
import Setting from "./components/Setting";
import ConfigModal from "./components/ConfigModal";

function App() {
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const summonerName = searchParams.get('summonerName');

  return (
    <div className="App">
      <Header setSearchParams={setSearchParams}/>
      <Routes>
        <Route path={`/`} element={<MatchList summonerName={summonerName || ''}/>}/>
      </Routes>
      <FixedContainer onClick={() => setVisible(true)}>
        <Setting width={'2em'} height={'2em'}/>
      </FixedContainer>
      <ConfigModal visible={visible} onClose={() => setVisible(false)}/>
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

  svg, path {
    fill: dodgerblue;
  }

  &:hover {
    background-color: dodgerblue;

    svg, path {
      fill: white;
    }
  }
`

export default App;
