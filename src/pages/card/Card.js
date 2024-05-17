import React, {Fragment, useEffect, useState} from "react";
import './card.css'
import api from "../../api/axiosConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {jwtDecode} from "jwt-decode";
import ImageComponent from "./ImageComponent";

export const Card = () => {
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

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userId = await determineUserRole();
                const response = await api.get(`/getProductsUsers/${userId}`); //`
                setCards(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        }

        fetchTransactions();// Вызываем функцию fetchTransactions при монтировании компонента
        determineUserRole();

        return () => {
            // Здесь можно добавить очистку (cleanup) если необходимо
        }

    }, [userId]); // Пус

    const handleDelete = async (id) => {
        try {
            await api.delete(`/deleteProduct/${id}`);
            // После успешного удаления можно выполнить дополнительные действия, например, обновить список карточек
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    }


    return (
        <Fragment>
            <h1>Карточка</h1>
            {userRole && (
                <>
                    <div className="wrapper" style={{ maxWidth: '460px', margin: '0 auto' }}>
                        <div className="card px-4" style={{ maxWidth: '460px', margin: '0 auto' }}>
                            <div className="my-3">
                                <p className="h8">Мои карты</p>
                            </div>
                            {cards.map((card, index) => (
                                <div key={index} className="debit-card mb-3" style={{ maxWidth: '460px', margin: '0 auto' }}>
                                    <div className="d-flex flex-column h-100" >
                                        <label className="d-block">
                                            <div className="d-flex position-relative">

                                                <div>
                                                    <ImageComponent imageUrl={card.name}/>
                                                    <img src={card.image}
                                                         className={card.name === 'Visa' ? 'Visa' : card.name === 'Мир' ? 'Мир' : 'Mastercard'}
                                                        /* alt={card.name}*/ />
                                                    <p className="mt-2 mb-4 text-white fw-bold">{card.numberScore}</p>
                                                    <p className="text-white fw-bold">{card.balance}$</p>
                                                </div>
                                                <div className="dropdown">
                                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                                            id="dropdownMenuButton2" data-bs-toggle="dropdown"
                                                            aria-expanded="false">

                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-dark"
                                                        aria-labelledby="dropdownMenuButton2">
                                                        {/*<li><a className="dropdown-item" href="#" onClick={handleDelete(card.numberScore)}>Закрыть</a></li>*/}
                                                        <button type="submit" className="dropdown-item"
                                                                onClick={() => handleDelete(card.numberScore)}>Закрыть
                                                        </button>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </label>
                                        <div
                                            className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                                            <p></p>
                                            <p>{card.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </>
            )}
        </Fragment>
    );
};
