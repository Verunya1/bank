import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';  // Import useNavigate hook for redirection
import api from "../api/axiosConfig";
import {Button} from "react-bootstrap";

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        phone: ''
    });
    const navigate = useNavigate();  // Hook to manage navigation

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', formData);
            localStorage.setItem('auth_token', response.data.token);  // Save token to localStorage
            console.log('Token set in storage:', localStorage.getItem('token'));
            navigate('/');  // Redirect to home page after registration
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <div className="registration-container d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="registration-form">
                <h2>Account Registration</h2>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" className="form-control input-sm"
                                   placeholder="Enter your first name" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" className="form-control input-sm"
                                   placeholder="Enter your last name" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" className="form-control input-sm"
                                   placeholder="Enter your phone" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="login">Username</label>
                            <input type="text" name="login" className="form-control input-sm"
                                   placeholder="Choose a username" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row g-2 d-flex justify-content-center">
                    <div className="col-md">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control input-sm"
                                   placeholder="Choose a password" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>
                <Button className="mt-3" variant="secondary" onClick={handleSubmit}>Register</Button>
            </form>
        </div>
    );
}

export default Registration;