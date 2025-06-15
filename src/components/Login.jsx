import React, { use, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants'; // Import useNavigate for navigation

const Login = () => {

    const [emailId, setEmailId] = useState('abcd@mail.com');
    const [password, setPassword] = useState('Iamaboy@123');   
    const [error, setError] = useState(null); // State to hold error messages
    const dispatch = useDispatch();
     const navigate = useNavigate();

    const handleLogin = async(e) => {
       
        try{
        const response = await axios.post(`${BASE_URL}/login`, { emailId, password }, {withCredentials: true});
        dispatch(addUser(response.data));
        navigate("/")
        if(response.status === 200){
            console.log("Login successful:", response.data);
            // Redirect or perform any other action on successful login
        } else {
            console.error("Login failed with status:", response.status);
        }
    }catch(error){
        setError(error.response?.data);
        console.error("Login failed:", error);
    }}

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-[28rem] shadow-xl">
                <div className="card-body">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-6">
                        <legend className="fieldset-legend text-lg font-semibold">Login</legend>

                        <label className="label mt-2">Email</label>
                        <input type="email" className="input input-bordered w-full" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />

                        <label className="label mt-4">Password</label>
                        <input type="password" className="input input-bordered w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if exists */}
                        <button className="btn btn-neutral mt-6 w-full" onClick={handleLogin}>Login</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Login;
