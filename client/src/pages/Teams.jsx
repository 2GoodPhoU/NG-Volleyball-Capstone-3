import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/teams')
            .then((response) => {
                setTeams(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    },[]);
  return (
    <div className ='p-4'>
        <div className = 'flex justify-between items-center'>
            <h1 className= 'text-3xl my-8'> Teams </h1>
            <Link to='/teams/create'>
                <MdOutlineAddBox className ='text-sky-800 text-4xl' />
            </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-seperate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className ='border border-slate-600 rounded-md'>Team No</th>
                            <th className ='border border-slate-600 rounded-md'>Team Name</th>
                            
                            <th className='border border-slate-600 rounded-md'>Ladder Position</th>
                            <th className='border border-slate-600 rounded-md'>Team Captain</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team,index) => (
                            <tr key={team._id} className ='h-8'>
                                <td className ='border border-slate-700 rounded-md text-center'>
                                    {index+1}
                                </td>
                                <td className ='border border-slate-700 rounded-md text-center'>
                                    {team.teamName}
                                </td>
                                
                                <td className ='border border-slate-700 rounded-md text-center'>
                                    {team.ladderPosition}
                                </td>
                                <td className ='border border-slate-700 rounded-md text-center'>
                                    {team.captainUsername}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/teams/details/${team._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
            </div>
  )
}

export default Teams