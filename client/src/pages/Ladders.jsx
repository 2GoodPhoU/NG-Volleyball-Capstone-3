import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';


const Ladders = () => {
    const [ladders, setLadders] = useState([]);
    //const [loading, setLoading] = useState(false);
    useEffect(() => {
        //setLoading(true);
        axios
            .get('http://localhost:5555/ladders')
            .then((response) => {
                setLadders(response.data.data);
               // setLoading(false);
            })
            .catch((error) => {
                console.log(error);
               // setLoading(false);
            });
    },[]);

  return (
        <div className = 'flex flex-col justify-between items-center'>
            <h1 className= 'text-4xl my-8 text-emerald-500'> Ongoing Ladders </h1>
            <ul className='space-y-3'>
                {ladders.map((ladder) => (
                    <li className='border border-orange-400 rounded-md bg-orange-400 hover:bg-orange-600 text-white text-2xl px-10 py-1' key={ladder._id} >
                        <Link to={'/ladders/details/'+ladder.ladderID}>
                            {ladder.ladderName} 
                            </Link>
                        </li>
                ))}
            </ul>

            
            </div>
  );
};

export default Ladders