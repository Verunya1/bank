import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import api from '../../api/axiosConfig.js';
import { useState, useEffect } from "react";

export const OffersOnAccounts = () => {
    const [rates, setRates] = useState([]);

    const handleGetRate = async (rateId) => {
        try {
            const response = await api.get(`/getRate/${rateId}`);
            console.log(response.data);
            // Дополнительная обработка данных, если необходимо
        } catch (error) {
            console.error("Error fetching rate details: ", error);
        }
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

    }, []);

    return (
        <Fragment>
            <h1>OffersOnAccounts</h1>
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
    );
};

{/*<form className="row g-3">*/}
{/*    <div className="col-md-6">*/}
{/*        <label htmlFor="nameRate" className="form-label">Наименование продукта</label>*/}
{/*        <input type="email" className="form-control" id="nameRate"/>*/}
{/*    </div>*/}
{/*    <div className="col-md-6">*/}
{/*        <label htmlFor="description" className="form-label">Описание</label>*/}
{/*        <input type="password" className="form-control" id="description"/>*/}
{/*    </div>*/}
{/*    <div className="col-12">*/}
{/*        <label htmlFor="percentService" className="form-label">Процент обслуживания</label>*/}
{/*        <input type="text" className="form-control" id="percentService" placeholder="0.00%"/>*/}
{/*    </div>*/}
{/*    <div className="col-12">*/}
{/*        <label htmlFor="namePaymentSystem" className="form-label">Наименование платежной системы</label>*/}
{/*        <input type="text" className="form-control" id="namePaymentSystem"*/}
{/*               placeholder="Mastercard, Visa, Мир"/>*/}
{/*    </div>*/}
{/*    <div className="col-12">*/}
{/*        <button type="submit" className="btn btn-primary">Создать</button>*/}
{/*    </div>*/}
