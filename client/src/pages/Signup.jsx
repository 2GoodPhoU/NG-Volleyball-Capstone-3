import React, {useState} from "react";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function register(event) {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5555/users/signup', {
                userName,
                fullname,
                password,
            });
            alert("Signed up successfully. Go login");
            navigate('/');
        }
            catch (error) {
                console.log(error);
                alert('Failed. Please try again');
            }
        }
    
    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className="flex-row">
            <h1>
                Register
            </h1>
            <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={register}>
                <label>
                    Full Name
                </label>
                <input type="text" value = {fullname} onChange={event => setFullname(event.target.value)} />
                <label>
                    Email
                </label>
                <input type="email" value = {userName} onChange={event => setUsername(event.target.value)} />
                <label>
                    Password
                </label>
                <input type="password" value = {password} onChange={event => setPassword(event.target.value)} />
                <button>Sign up</button>

            </form>
            <div>Already have an account? <Link className="underline" to={'/login'}> Login</Link> </div>
            </div>
        </div>
    )
}

export default Signup