import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeamsForLadder = () => {
    const { ladderID } = useParams();

    console.log("ladderID",ladderID);
    
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        if (!ladderID) {
            return;
          }
        axios
            .get(`http://localhost:5555/ladders/${ladderID}/teams`)
            .then((response) => {
                setTeams(response.data.data);

                console.log("data",response.data.data);
                
            })
            .catch((error) => {
                console.log(error);
               
            });
    }, [ladderID]);

    if (!teams) return '';

   
    return (
        <div className='flex flex-col justify-between items-center mt-20'>
        <ul className='space-y-3'>
          {teams.map((team) => (
            <li className='flex justify-start items-start text-white text-2xl px-10 gap-10' key={team._id}>
              <div className='border border-orange-400 bg-orange-400 rounded-full px-3 py-1'>
                {team.ladderPosition}
              </div>
              <div className='border border-orange-400 bg-orange-400 rounded-full px-5 py-1'>
                {team.teamName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default TeamsForLadder;