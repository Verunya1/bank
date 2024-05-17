import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import {setAuthToken} from '../utils/Auth';
import axios from '../api/axiosConfig';
import {Button} from "react-bootstrap";


const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for redirection

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/auth/login", {login, password});
            setAuthToken(response.data.token); // Set the token in local storage
            console.log(response.data.token);
            navigate('/'); // Redirect to the homepage
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Login failed:", error);
            setAuthToken(null); // Ensure token is cleared if login fails
        }
    };

    return (
        <div className="login-container d-flex justify-content-center">
            <form onSubmit={onSubmit} className="login-form">
                <h2 className="text-center">Account Login</h2>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="login" className="text-center">Username</label>
                            <input type="text" name="login" value={login} onChange={(e) => setLogin(e.target.value)}
                                   placeholder="Enter your username"/>
                        </div>
                    </div>
                </div>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="password" className="text-center">Password</label>
                            <input type="password" name="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
                        </div>
                    </div>
                </div>
                <Button className="mt-3" variant="secondary" onClick={onSubmit}>Login</Button></form>
        </div>
    );
};

export default LoginForm;