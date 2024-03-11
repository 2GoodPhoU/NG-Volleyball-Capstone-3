
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../index.css';


const Home = () => {
    
    
    useEffect(() => {
        
        axios
            .get('http://localhost:5555/')
            .then((response) => {
                              
            })
            .catch((error) => {
                console.log(error);
                
            });
    },[]);
  return (
    <div>
    <div className='flex flex-col lg:flex-row justify-start items-start lg:py-10 lg:gap-72 mt-10'>  

        <div className ="flex flex-col justify-betweem items-between gap-10 mt-36 ml-10">
          <button className = " rounded-lg bg-gradient-to-r from-sky-400 to-emerald-300 hover:from bg-sky-500 hover:to-emerald-400 text-white text-xl px-3 py-2">
          <Link to={'/ladders'}>
          Get Started
          </Link>
          </button>
          
        </div >
        <div  >
          <img className =" h-auto max-w-xl rounded-lg " src='/src/images/7229702.jpg'>
          </img>
        </div>

    </div >
    
    </div>

  )
}

export default Home