import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import ShowTeam from './pages/ShowTeam';


const App = () => {
  return (
    <Routes>
      <Route path = '/' element ={<Home />} />
      <Route path = '/teams/create' element ={<CreateTeam />} />
      <Route path = '/teams/details' element ={<ShowTeam />} />
    </Routes>
  )
}

export default App