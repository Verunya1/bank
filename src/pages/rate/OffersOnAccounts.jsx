import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import api from '../../api/axiosConfig.js';
import {useState, useEffect} from "react";
import {jwtDecode} from 'jwt-decode';

export const OffersOnAccounts = () => {
    const [rates, setRates] = useState([]);

    const [nameRate, setNameRate] = useState('');
    const [description, setDescription] = useState('');
    const [percentService, setPercentService] = useState('');
    const [namePaymentSystem, setNamePaymentSystem] = useState('');


    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); // Добавить состояние для userId


    const determineUserRole = () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role); // Устанавливаем роль пользователя
            setUserId(decoded.userId); // Извлечь userId из токена
            console.log("UserRole:", userRole);
        }
    };


    const handleGetRate = async (rateId) => {
        try {
            const response = await api.get(`/getRate/${rateId}`);
            console.log(response.data);
            // Дополнительная обработка данных, если необходимо
        } catch (error) {
            console.error("Error fetching rate details: ", error);
        }
    };

    const handleSelectChange = (e) => {
        setNamePaymentSystem(e.target.value);
    };
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await api.get('/getRateAll');
                setRates(response.data);
            } catch (error) {
                console.error("Error fetching rates: ", error);
            }
        };

        fetchRates();
        determineUserRole();
    }, []);
    const handleCreate = async () => {
        const dataToSend = {
            nameRate: nameRate,
            description: description,
            percentService: parseFloat(percentService),
            namePaymentSystem: namePaymentSystem
        };

        try {
            await api.post(`/createRate`, dataToSend);
            console.log(dataToSend);
            // После успешного удаления можно выполнить дополнительные действия, например, обновить список карточек
        } catch (error) {
            console.error("Error create card:", error);
        }
    }

    return (
        <Fragment>
            {userRole === "ADMIN" && (
                <>
                    <h1>OffersOnAccounts</h1>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="nameRateInput">Введите наименование нового предложения:</label>
                                <input type="text" className="form-control" min="0" value={nameRate}
                                       onChange={(e) => setNameRate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="descriptionInput">Введите описание предложения:</label>
                                <input type="text" className="form-control" value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="amountInput">Введите процент обслуживания:</label>
                                <input type="number" className="form-control" min="0" step="0.01"
                                       value={percentService}
                                       onChange={(e) => setPercentService(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" value={namePaymentSystem} onChange={handleSelectChange}>
                                <option value="Mastercard">Mastercard</option>
                                <option value="Visa">Visa</option>
                                <option value="Мир">Мир</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">Выберите наименование платежной системы</label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleCreate}>Отправить</button>
                    </div>
                </>
            )}
            {rates.map((rate) => (
                <div className="row" key={rate.id}>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{rate.rateId}</h5>
                                <h5 className="card-title">{rate.nameRate}</h5>
                                <p className="card-text">{rate.description}</p>
                                <Link to={`/vBank/getRate/${rate.rateId}`} className="btn btn-primary">
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </Fragment>
    )
        ;
};
