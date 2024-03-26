import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import isLoggedIn from './pages/Login';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


export default function Header() {

  const {user, setUser} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  async function logout() {
    await axios.post('http://localhost:5555/users/logout');
    navigate('/');
    setUser(null);
  }
    return(

        <nav className='flex justify-between'>
            <div
            className='w-full container mx-auto flex flex-col justify-start items-start '>
              <a
            className="text-orange-400 font-bold text-xl lg:text-4xl" href='/'>
                Volleyball 
                </a>
                <a
            className="text-orange-400 font-bold text-xl lg:text-4xl" href='/'>
                Tournament 
                </a>
            </div>
            <div className="block lg:hidden pr-4">

            <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-orange-500 appearance-none focus:outline-none">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            </button>
            </div>

            <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20"
            id="nav-content">
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
          
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/ladders"  
                >ladders</a
              >
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/teams"
                >teams</a
              >
            </li>
          </ul>
          <div className="flex flex-col">
          <button
            onClick={() => setIsOpen((prev) => !prev)} 
            className="mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-4">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg> 
          </button>
          {isOpen && (
            <div className =" top-5 flex flex-col items-center p-2 w-full" >
              {!user &&
            <ul>
              <li>
              <Link to={'/login'}>
                Login
                </Link>
              </li>
              <li>
              <Link to={'/signup'}>
                Signup
                </Link>
              </li>
            </ul>}
            {!!user && 
            <ul>
              <li>
                {user.fullname}
              </li>
              <li >
                <Link to={'/dashboard'}>
                Dashboard
                </Link>                
              </li>
              <li>
              Setting
              </li>
              <button onClick={logout}>
              Log out
              </button>
            </ul>}
              </div>

          )}
          </div>

        </div>
        </nav>

    );
}

