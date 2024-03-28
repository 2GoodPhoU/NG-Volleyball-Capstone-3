import React, {useContext, useState} from "react";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";


const Login = () => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const {setUser} = useContext(UserContext);
    
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:5555/users/login',{ userName, password});
            setUser(data);
            alert("Login successful");
            setIsLoggedIn(true);
            navigate('/');
        }
            catch (error) {
                console.log(error);
                alert('Login failed');
            }
        }
        
    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className="flex-row">
            <h1>
                Login
            </h1>
            <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
                
                <label>
                    Email
                </label>
                <input type="email" value = {userName} onChange={event => setUsername(event.target.value)} />
                <label>
                    Password
                </label>
                <input type="password" value = {password} onChange={event => setPassword(event.target.value)} />
                <button>Login</button>

            </form>
            <div>Don't have an account? <Link className="underline" to={'/signup'}> Sign up</Link></div>
            </div>
        </div>
    )
}

export default Login