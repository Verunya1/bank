import React from "react";
import {NavLink} from "react-router-dom";
export const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <div className="navbar-brand">
            VBank
        </div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/">Главная</NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/vBank/getTransactionAll">Транзакции</NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/card">Карты</NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/vBank/createTransaction">Создать транзакцию</NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/vBank/getRateAll">Предложения</NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/personalAccount">Личный кабинет</NavLink>
            </li>
        </ul>
    </nav>
)