import React, {Fragment} from "react";
import "./lk.css"
// import LoginForm from './LoginForm';
// import AuthContent from './AuthContent';
// import {request, setAuthHeader} from '../../api/axiosConfig';
// // import * as React from 'react';
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


export const PersonalAccount=()=>{
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('auth_token');

    const handleLoginRedirect = () => {
        navigate('/login'); // Переход на страницу входа
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Переход на страницу регистрации
    };

    // onLogin = (e, username, password) => {
    //     e.preventDefault();
    //     request(
    //         "POST",
    //         "/login",
    //         {
    //             login: username,
    //             password: password
    //         }).then(
    //         (response) => {
    //             setAuthHeader(response.data.token);
    //             this.setState({componentToShow: "messages"});
    //         }).catch(
    //         (error) => {
    //             setAuthHeader(null);
    //             this.setState({componentToShow: "welcome"})
    //         }
    //     );
    // };
    //
    // onRegister = (event, firstName, lastName, username, password) => {
    //     event.preventDefault();
    //     request(
    //         "POST",
    //         "/register",
    //         {
    //             firstName: firstName,
    //             lastName: lastName,
    //             login: username,
    //             password: password
    //         }).then(
    //         (response) => {
    //             setAuthHeader(response.data.token);
    //             this.setState({componentToShow: "messages"});
    //         }).catch(
    //         (error) => {
    //             setAuthHeader(null);
    //             this.setState({componentToShow: "welcome"})
    //         }
    //     );
    // };
    //
    // render() {
    //     return (
    //         <>
    //             <Buttons
    //                 login={this.login}
    //                 logout={this.logout}
    //             />
    //
    //             {this.state.componentToShow === "welcome" && <WelcomeContent/>}
    //             {this.state.componentToShow === "login" &&
    //                 <LoginForm onLogin={this.onLogin} onRegister={this.onRegister}/>}
    //             {this.state.componentToShow === "messages" && <AuthContent/>}
    //
    //         </>
    //     );
    // };

    // return(
    //     <Fragment>
    //         <h1>PersonalAccount</h1>
    //         <div className="page-content page-container" id="page-content">
    //             <div className="padding">
    //                 <div className="row container d-flex justify-content-center">
    //                     <div className="col-xl-6 col-md-12">
    //                         <div className="card user-card-full">
    //                             <div className="row m-l-0 m-r-0">
    //                                 <div className="col-sm-4 bg-c-lite-green user-profile">
    //                                     <div className="card-block text-center text-white">
    //                                         <div className="m-b-25">
    //                                             <img src="https://img.icons8.com/bubbles/100/000000/user.png"
    //                                                  className="img-radius" alt="User-Profile-Image"/>
    //                                         </div>
    //                                         <h6 className="f-w-600">Vera Ryzhova</h6>
    //                                         <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
    //                                     </div>
    //                                 </div>
    //                                 <div className="col-sm-8">
    //                                     <div className="card-block">
    //                                         <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
    //                                         <div className="row">
    //                                             <div className="col-sm-6">
    //                                                 <p className="m-b-10 f-w-600">Email</p>
    //                                                 <h6 className="text-muted f-w-400">rntng@gmail.com</h6>
    //                                             </div>
    //                                             <div className="col-sm-6">
    //                                                 <p className="m-b-10 f-w-600">Phone</p>
    //                                                 <h6 className="text-muted f-w-400">98979989898</h6>
    //                                             </div>
    //                                         </div>
    //                                         <div className="row">
    //                                             <div className="col-sm-6">
    //                                                 <p className="m-b-10 f-w-600">Имя</p>
    //                                                 <h6 className="text-muted f-w-400">firstName</h6>
    //                                             </div>
    //                                             <div className="col-sm-6">
    //                                                 <p className="m-b-10 f-w-600">Фамилия</p>
    //                                                 <h6 className="text-muted f-w-400">LastName</h6>
    //                                             </div>
    //                                             <button type="submit" className="btn btn-primary">Выйти</button>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </Fragment>
    // )

    return (
        <Container fluid>
            {/*{isAuthenticated ? (*/}
            {/*    <Hero movies={movies} />*/}
            {/*) : (*/}
                <div className="text-center">
                    <h2>Добро пожаловать!</h2>
                    <p>Войдите или зарегистрируйтесь, чтобы продолжить.</p>
                    <Button variant="primary" onClick={handleLoginRedirect} className="me-2">Войти</Button>
                    <Button variant="secondary" onClick={handleRegisterRedirect}>Регистрация</Button>
                </div>
            {/*)}*/}
        </Container>
    );
}
export default PersonalAccount;