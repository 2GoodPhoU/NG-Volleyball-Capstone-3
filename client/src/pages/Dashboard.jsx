import React from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import axios from 'axios';
import  { useState} from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const {user, setUser} = useContext(UserContext);
    
    return (
       
        <div>{user.fullname}
        <h1>{user.userName}</h1>
        {!user.teamMembership &&
        <button>Join a team</button>}
        </div>
        
    
    )
}

export default Dashboard