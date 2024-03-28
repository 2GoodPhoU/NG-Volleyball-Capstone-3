// import React from "react";
// import { UserContext } from "../UserContext";
// import { useContext } from "react";
// import axios from 'axios';
// import  { useState} from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {

//     const {user, setUser} = useContext(UserContext);
    
//     return (
       
//         <div>{user.fullname}
//         <h1>{user.userName}</h1>
//         {!user.teamMembership &&
//         <button>Join a team</button>}
//         </div>
        
    
//     )
// }

// export default Dashboard

import React,{useState, useEffect, useContext} from "react";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';
import {FaUsers,FaTrophy,FaTasks,FaHistory,FaUserCog,FaCogs} from "react-icons/fa";
import axios from "axios";
const Dashboard = () => {
        const {user, setUser} = useContext(UserContext);
    
    return (
       
        <div className="flex h-screen">
            <aside className = "w-1/5 bg-gradient-to-br from-orange-500 to-red-500 text-white py-8 px-4 " >
                <h2 className="text-2xl font-bold mb-4"> Welcome {user ? user.fullname: ''} </h2>
                <h2 className="text-2xl font-bold mb-8"> Dashboard Navigation </h2>
                <ul className = "space-y-2">
                    <li> <a href = "#1" className = "flex items-center py-2 px-4 rounded hover:bg-gray-700"> <FaUsers className = "mr-2" /> Team Overview </a> </li>
                    <li> <a href = "#2" className = "flex items-center py-2 px-4 rounded hover:bg-gray-700"> <FaTrophy className = "mr-2" /> Ladder Structure  </a> </li>
                    <li> <a href = "#3" className = "flex items-center py-2 px-4 rounded hover:bg-gray-700"> <FaTasks className = "mr-2" />Challege Management </a> </li>
                    <li> <a href = "#4" className = "flex items-center py-2 px-4 rounded hover:bg-gray-700"> <FaHistory className = "mr-2" />Match History </a> </li>
                    <li> <a href = "#5" className = "flex items-center py-2 px-4 rounded hover:bg-gray-700"> <FaUserCog className = "mr-2" />Team Roster </a> </li>
                    <li> <a href = "#6" className = "flex items-center py-2 px-4 rounded hover:bg-gray-700"> <FaCogs className = "mr-2" />Settings </a> </li>
                </ul>
            </aside>
            <main className = "w-4/5 p-8 bg-gray-100 flex flex-wrap">
                <div className = "w-1/2 pr-4">
                <section id = "1" className = "dashboard-section mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className = "text-2xl font-semibold mb-4"> <FaUsers className = "mr-2" />Team Overview</h2>
                    <p> This setion will display a summary of users team details. </p>
                </section>
                <section id = "5" className = "dashboard-section mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className = "text-2xl font-semibold mb-4"> <FaUserCog className = "mr-2" /> Team Roster</h2>
                    <p> This setion will display Team Roster. </p>
                </section>
                </div>
                <div className = "w-1/2 pr-4">
                <section id = "3" className = "dashboard-section mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className = "text-2xl font-semibold mb-4"> <FaTasks className = "mr-2" /> Challenge Management</h2>
                    <p> This setion will display a summary of users team details. </p>
                </section>
                <section id = "4" className = "dashboard-section mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className = "text-2xl font-semibold mb-4"> <FaHistory className = "mr-2" /> Match History</h2>
                    <p> This setion will display Match History. </p>
                </section>
                </div>
                <div className = "w-4/5 pr-4">
                <section id = "2" className = "dashboard-section mb-8 bg-white p-6 rounded-lg shadow-md" style ={{marginTop: "5px", height: "600px", width: "850px"}}>
                    <h2 className = "text-2xl font-semibold mb-4"> <FaTrophy className = "mr-2" />Ladder Structure</h2>
                    <p> This setion will display Ladder Standings. </p>
                </section>
              </div>
            </main>
        </div>

    );
    
};

export default Dashboard;





