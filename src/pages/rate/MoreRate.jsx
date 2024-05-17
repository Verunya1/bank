// import React, {Fragment} from "react";
//
// import {Link} from "react-router-dom";
// import {Button} from "react-bootstrap";
//
// export const MoreRate = () => {
//     return (
//         <Fragment>
//             <form className="row g-3">
//                 <div className="row">
//                     <div className="col-sm-6">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">Наименование продукта</h5>
//                                 <p className="card-text">Описание</p>
//                                 <p className="card-text">Процент обслуживания</p>
//                                 <p className="card-text">Платежная система</p>
//                                 <Link to="/card" className="btn btn-primary">Открыть</Link>
//                                 {/*<Button to="/card"  type='submit'>Открыть</Button>*/}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//             {/*    todo сделать в зависимости от пользователя тот или иной текст виден*/
//             }
//         </Fragment>
//     )
// }
// ----
// const handleOpenAndSave = async () => {
//         try {
//             // Получаем данные из таблицы rate по id (замените id на фактическое значение)
//             const id = '123'; // Пример id
//             const responseRate = await api.get(`/getRate/${id}`);
//
//             // Данные из таблицы rate
//             const rateData = responseRate.data;
//
//             // Создаем объект с данными для сохранения в таблицу product
//             const dataToSave = {
//                 productName: rateData.productName,
//                 description: rateData.description,
//                 servicePercentage: rateData.servicePercentage,
//                 paymentSystem: rateData.paymentSystem
//             };
//
//             // Отправляем POST запрос на сервер для сохранения данных
//             const response = await api.post('/saveProduct', dataToSave);
//
//             // Дополнительные действия при успешном сохранении данных
//             console.log('Данные успешно сохранены в таблицу product', response.data);
//
//         } catch (error) {
//             console.error('Ошибка при сохранении данных в таблицу product', error);
//         }
//     };
//
//     return (
//         <Fragment>
//             <form className="row g-3">
//                 <div className="row">
//                     <div className="col-sm-6">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">Наименование продукта</h5>
//                                 <p className="card-text">Описание</p>
//                                 <p className="card-text">Процент обслуживания</p>
//                                 <p className="card-text">Платежная система</p>
//                                 <button onClick={handleOpenAndSave} className="btn btn-primary">Открыть и сохранить</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </Fragment>
//     );
import React, { useEffect, useState } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import api from '../../api/axiosConfig.js';
import {jwtDecode} from "jwt-decode";

export const MoreRate = (props) => {
    const location = useLocation();
    let {rateId} = useParams();
    const [userRole, setUserRole] = useState(null);
    const [rateDetails, setRateDetails] = useState(null);
    const [userId, setUserId] = useState(null); // Добавить состояние для userId
    const params = useParams();

    const navigate = useNavigate();
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

    // useEffect(() => {
    //     handleGetRateDetails(rateId);
    // }, [rateId]);
    // const handleGetRateDetails = async (id) => {
    //     try {
    //         const response = await api.get(`/getRate/${id}`);
    //         console.log(response.data);
    //         setRateDetails(response.data);
    //     } catch (error) {
    //         console.error("Error fetching rate details: ", error);
    //     }
    // };

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
                {/* Другой JSX код для отображения информации о рейтинге */}
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


