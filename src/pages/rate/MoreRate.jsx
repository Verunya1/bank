import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import api from '../../api/axiosConfig.js';
import {jwtDecode} from "jwt-decode";

export const MoreRate = (props) => {
    let {rateId} = useParams();
    const [userRole, setUserRole] = useState(null);
    const [rateDetails, setRateDetails] = useState(null);
    const [userId, setUserId] = useState(null); // Добавить состояние для userId


    const determineUserRole = () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role); // Устанавливаем роль пользователя
            setUserId(decoded.userId); // Устанавливаем userId из токена
            console.log("UserRole:", userRole);
            console.log("UserId:", userId);
            return decoded.userId; // возвращаем userId
        }
    };

    useEffect(() => {
        const handleGetRateDetails = async (id) => {
            try {
                const response = await api.get(`/getRate/${id}`);
                console.log(response.data);
                setRateDetails(response.data);
            } catch (error) {
                console.error("Error fetching rate details: ", error);
            }
        };
        handleGetRateDetails(rateId);
        // determineUserRole();

    }, [rateId]);
    useEffect(() => {
        determineUserRole();
        if (userId) {
            handleCreate(rateDetails, userId);
        }
    }, [userId]);

    const handleCreate = async (id, userId) => {
        const dataToSend = {
            rateId: id,
            userId: userId
        };
        try {
            await api.post(`/createProduct`, dataToSend);
            console.log(dataToSend);
            // После успешного удаления можно выполнить дополнительные действия, например, обновить список карточек
        } catch (error) {
            console.error("Error create card:", error);
        }
        determineUserRole();
    }
    if (rateId) {
        return (
            <div>
                <h1>Rate ID: {rateId}</h1>
                {rateDetails && (
                    <>
                        <p>Наименование счета: {rateDetails.nameRate}</p>
                        <p>Процент обслуживания: {rateDetails.percentService}</p>
                        <p>Платежная система: {rateDetails.namePaymentSystem}</p>
                        <p>Описание: {rateDetails.description}</p>
                        <Link to={`/card`} className="btn btn-primary" onClick={() => handleCreate(rateId, userId)}>
                            Открыть карту
                        </Link>
                    </>
                )}
            </div>
        );
    } else {
        return <div>Rate не существует или не содержит свойство rateId</div>;
    }

};


