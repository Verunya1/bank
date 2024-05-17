import React, {Fragment, useEffect, useState} from "react";
import './home.css'
import api from "../../api/axiosConfig";
import {jwtDecode} from "jwt-decode";

export const Home = () => {
    const [cards, setCards] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); // Добавить состояние для userId

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

    const getTotalAmount = () => {
        if (cards.length === 0) {
            return 0; // Возвращаем 0, если массив пустой
        }
        return cards.reduce((total, card) => total + card.balance, 0);
    }

    const getCardAmount = (cardNumber) => {
        const card = cards.find(card => card.numberScore === cardNumber);
        return card ? card.balance : 0;
    }


    useEffect(() => {
        const fetchCardsUsers = async () => {
            try {
                const userId = await determineUserRole();
                const response = await api.get(`/getProductsUsers/${userId}`); //`
                setCards(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        }

        fetchCardsUsers();// Вызываем функцию fetchTransactions при монтировании компонента
        determineUserRole();

        return () => {
            // Здесь можно добавить очистку (cleanup) если необходимо
        }

    }, [userId]); // Пус


    return (
        <Fragment>
            <h1>Home</h1>
            <div className="presentation"></div>
            <div className="container">
                <div className="row m-0">
                    <div className="col-md-7 col-12">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="row box-right">
                                    <div className="col-md-8 ps-0">
                                        <p className="ps-3 text-muted fw-bold h6 mb-0">Общая сумма</p>
                                        <p className="h1 fw-bold d-flex">
                                            <span
                                                className="fa fa-dollar-sign text-muted pe-1 h6 align-text-top mt-1"></span>$
                                            {getTotalAmount()}
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        {cards.map(card => (
                                            <div key={card.numberScore}>
                                                <p className="p-blue">
                                                    {card.numberScore}
                                                </p>
                                                <p className="fw-bold">
                                                    <span
                                                        className="fas fa-dollar-sign pe-1"></span>${getCardAmount(card.numberScore)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
