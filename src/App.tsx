import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import MatchList from "./pages/MatchList";
import Header from "./Header";
import styled from "@emotion/styled";
import Setting from "./components/Setting";
import ConfigModal from "./components/ConfigModal";

function App() {
  const [visible, setVisible] = useState(false);



  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/:summonerName' element={<MatchList/>}/>
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
