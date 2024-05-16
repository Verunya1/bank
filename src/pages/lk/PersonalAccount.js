import React, {Fragment, useEffect, useState} from "react";
import "./lk.css"
// import LoginForm from './LoginForm';
// import AuthContent from './AuthContent';
// import {request, setAuthHeader} from '../../api/axiosConfig';
// // import * as React from 'react';
import {Button, Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../../api/axiosConfig";


export const PersonalAccount = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('auth_token');

    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); // Добавить состояние для userId
    const params = useParams();

    const [users, setUsers] = useState(null);

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [phone, setPhone] = useState('');

    const [selectedOperation, setSelectedOperation] = useState('');

    const handleLoginRedirect = () => {
        navigate('/login'); // Переход на страницу входа
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Переход на страницу регистрации
    };

    const determineUserRole = () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role); // Устанавливаем роль пользователя
            setUserId(decoded.userId); // Извлечь userId из токена
            console.log("UserRole:", userRole);
            return decoded.userId; // возвращаем userId

        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = await determineUserRole();
                const response = await api.get(`/personalAccount/${userId}`); //`
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        }

        fetchUser();// Вызываем функцию fetchTransactions при монтировании компонента
        // determineUserRole(userId);

        return () => {
            // Здесь можно добавить очистку (cleanup) если необходимо
        }

    }, [userId]); // Пус

    const handleLogout = () => {
        localStorage.removeItem('auth_token');

        // Очистка данных пользователя
        setUserRole(null); // установить роль пользователя в null
        setUserId(null); // установить userId в null
        // Дополнительные действия по очистке данных пользователей, если необходимо

        console.log('Выход из сессии');
        // здесь вы можете добавить логику для выхода из сессии
    };

    return (

        <Container fluid>
            {userRole && userId && (
                <>
                    <h1>PersonalAccount</h1>
                    <div className="page-content page-container" id="page-content">
                        <div className="padding">
                            <div className="row container d-flex justify-content-center">
                                <div className="col-xl-6 col-md-12">
                                    <div className="card user-card-full">
                                        <div className="row m-l-0 m-r-0">
                                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                                <div className="card-block text-center text-white">
                                                    <div className="m-b-25">
                                                        <img src="https://img.icons8.com/bubbles/100/000000/user.png"
                                                             className="img-radius" alt="User-Profile-Image"/>
                                                    </div>
                                                    {users && users.firstName && users.lastName && (
                                                        <>
                                                            <h6 className="f-w-600">{users.firstName} {users.lastName}</h6>
                                                            <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                        </>)}
                                                    {/*<h6 className="f-w-600">{user.firstName} {user.lastName}</h6>*/}
                                                    <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="card-block">
                                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Логин</p>
                                                            {/*<h6 className="text-muted f-w-400">rntng@gmail.com</h6>*/}
                                                            {users && users.login && (
                                                                <>
                                                                    <h6 className="text-muted f-w-400">{users.login}</h6>
                                                                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                                </>)}
                                                            {/*<h6 className="text-muted f-w-400">{users.login}</h6>*/}
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Телефон</p>
                                                            {/*<h6 className="text-muted f-w-400">98979989898</h6>*/}
                                                            {users && users.phone && (
                                                                <>
                                                                    <h6 className="text-muted f-w-400">{users.phone}</h6>
                                                                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                                </>)}
                                                            {/*<h6 className="text-muted f-w-400">{users.phone}</h6>*/}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Имя</p>
                                                            {/*<h6 className="text-muted f-w-400">firstName</h6>*/}
                                                            {users && users.firstName && (
                                                                <>
                                                                    <h6 className="text-muted f-w-400">{users.firstName}</h6>
                                                                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                                </>)}
                                                            {/*<h6 className="text-muted f-w-400">{users.firstName}</h6>*/}
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Фамилия</p>
                                                            {/*<h6 className="text-muted f-w-400">LastName</h6>*/}
                                                            {users && users.lastName && (
                                                                <>
                                                                    <h6 className="text-muted f-w-400">{users.lastName}</h6>
                                                                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                                </>)}
                                                            {/*<h6 className="text-muted f-w-400">{users.lastName}</h6>*/}
                                                        </div>
                                                        {/*<button type="submit" className="btn btn-primary">Выйти</button>*/}
                                                        <Button variant="secondary"
                                                                onClick={handleLogout}>Выйти</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!userRole && (
                <>

                    <div className="text-center">
                        <h2>Добро пожаловать!</h2>
                        <p>Войдите или зарегистрируйтесь, чтобы продолжить.</p>
                        <Button variant="primary" onClick={handleLoginRedirect} className="me-2">Войти</Button>
                        <Button variant="secondary" onClick={handleRegisterRedirect}>Регистрация</Button>
                    </div>
                </>
            )}
        </Container>
    );
}
export default PersonalAccount;