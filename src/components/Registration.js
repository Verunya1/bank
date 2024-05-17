// import classNames from "classnames";
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axiosConfig'
// export default class Registration extends React.Component {
//
//     const [formData, setFormData] = useState({
//                                                  firstName: "",
//                                                  lastName: "",
//                                                  login: "",
//                                                  password: "",
//                                                  phone: "",
//                                              });
//     const navigate = useNavigate();  // Hook to manage navigation
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/v1/auth/register', formData);
//             localStorage.setItem('auth_token', response.data.token);  // Save token to localStorage
//             console.log('Token set in storage:', localStorage.getItem('token'));
//             navigate('/');  // Redirect to home page after registration
//             window.location.reload(); // Reload the page
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     }
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         active: "login",
//     //         firstName: "",
//     //         lastName: "",
//     //         login: "",
//     //         password: "",
//     //         phone: "",
//     //         onLogin: props.onLogin,
//     //         onRegister: props.onRegister
//     //     };
//     // };
//
//     // onChangeHandler = (event) => {
//     //     let name = event.target.name;
//     //     let value = event.target.value;
//     //     this.setState({[name]: value});
//     // };
//
//     // onSubmitLogin = (e) => {
//     //     this.state.onLogin(e, this.state.login, this.state.password);
//     // };
//
//     // onSubmitRegister = (e) => {
//     //     this.state.onRegister(e, this.state.firstName, this.state.lastName, this.state.login, this.state.phone, this.state.password);
//     // };
//
//     render() {
//         return (
//             <div className="row justify-content-center">
//                 <div className="col-4">
//                     <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
//                         <li className="nav-item" role="presentation">
//                             <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
//                                     id="tab-register"
//                                     onClick={() => this.setState({active: "register"})}>Register
//                             </button>
//                         </li>
//                     </ul>
//
//                     <div className="tab-content">
//
//                         <div
//                             className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
//                             id="pills-register">
//                             <form onSubmit={this.onSubmitRegister}>
//
//                                 <div className="form-outline mb-4">
//                                     <input type="text" id="firstName" name="firstName" className="form-control"
//                                            onChange={this.onChangeHandler}/>
//                                     <label className="form-label" htmlFor="firstName">First name</label>
//                                 </div>
//
//                                 <div className="form-outline mb-4">
//                                     <input type="text" id="lastName" name="lastName" className="form-control"
//                                            onChange={this.onChangeHandler}/>
//                                     <label className="form-label" htmlFor="lastName">Last name</label>
//                                 </div>
//
//                                 <div className="form-outline mb-4">
//                                     <input type="text" id="login" name="login" className="form-control"
//                                            onChange={this.onChangeHandler}/>
//                                     <label className="form-label" htmlFor="login">Username</label>
//                                 </div>
//
//                                 <div className="form-outline" data-mdb-input-init>
//                                     <input type="tel" id="phone" name="phone" className="form-control"
//                                            onChange={this.onChangeHandler}/>
//                                     <label className="form-label" htmlFor="phone">Phone </label>
//                                 </div>
//
//                                 <div className="form-outline mb-4">
//                                     <input type="password" id="registerPassword" name="password"
//                                            className="form-control" onChange={this.onChangeHandler}/>
//                                     <label className="form-label" htmlFor="registerPassword">Password</label>
//                                 </div>
//
//                                 <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         <div className="registration-container">
//             <form onSubmit={handleSubmit} className="registration-form">
//                 <h2>Account Registration</h2>
//                 <div>
//                     <label htmlFor="firstName">First Name</label>
//                     <input type="text" name="firstName" placeholder="Enter your first name" onChange={handleChange}
//                            required/>
//                 </div>
//                 <div>
//                     <label htmlFor="lastName">Last Name</label>
//                     <input type="text" name="lastName" placeholder="Enter your last name" onChange={handleChange}
//                            required/>
//                 </div>
//                 <div>
//                     <label htmlFor="login">Username</label>
//                     <input type="text" name="login" placeholder="Choose a username" onChange={handleChange} required/>
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input type="password" name="password" placeholder="Choose a password" onChange={handleChange}
//                            required/>
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//         );
//     };
//
// }
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';  // Import useNavigate hook for redirection
import axios from '../api/axiosConfig';
import classNames from "classnames";
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