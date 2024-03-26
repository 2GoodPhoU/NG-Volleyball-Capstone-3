import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import ShowTeam from './pages/ShowTeam';
import Ladders from "./pages/Ladders";
import Teams from "./pages/Teams";
import Layout from "./Layout";
import TeamsForLadder from "./pages/TeamsForLadder";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";


axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
    <Routes>
      <Route path = '/' element ={<Layout />}>
        <Route index element ={<Home />} />
        <Route path = '/signup' element ={<Signup />} />
        <Route path = '/login' element ={<Login />} />
        <Route path = '/dashboard' element ={<Dashboard />} />
        <Route path = '/setting' element ={<Setting />} />
        <Route path = '/ladders' element ={<Ladders />} />
        <Route path = "/ladders/details/:ladderID" element ={<TeamsForLadder />} />
        <Route path = '/teams' element ={<Teams />} />
        <Route path = '/teams/create' element ={<CreateTeam />} />
        <Route path = '/teams/details' element ={<ShowTeam />} /> 
        </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App