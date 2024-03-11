import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import ShowTeam from './pages/ShowTeam';
import Ladders from "./pages/Ladders";
import Teams from "./pages/Teams";
import Layout from "./Layout";
import TeamsForLadder from "./pages/TeamsForLadder";



const App = () => {
  return (
    <Routes>
      <Route path = '/' element ={<Layout />}>
        <Route index element ={<Home />} />
        <Route path = '/ladders' element ={<Ladders />} />
        <Route path = "/ladders/details/:ladderID" element ={<TeamsForLadder />} />
        <Route path = '/teams' element ={<Teams />} />
        <Route path = '/teams/create' element ={<CreateTeam />} />
        <Route path = '/teams/details' element ={<ShowTeam />} /> 
        </Route>
    </Routes>
  )
}

export default App