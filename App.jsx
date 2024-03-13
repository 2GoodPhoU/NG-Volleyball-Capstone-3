import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import ShowTeam from './pages/ShowTeam';
import Message from "./message";
import ListGroup from "./components/ListGroup";
import { Button } from "bootstrap";
import Button from "./components/button"

const App = () => {
  return (
    <div><ListGroup/>

    <Button color = "primary" onClick={()=> console.log('clicked')}>My button</Button>
    <Routes>
      <Route path = '/' element ={<Home />} />
      <Route path = '/teams/create' element ={<CreateTeam />} />
      <Route path = '/teams/details' element ={<ShowTeam />} />
    </Routes> 
    </div>
  )
}

export default App