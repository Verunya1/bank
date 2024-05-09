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
import {Link, useLocation, useParams} from "react-router-dom";
import api from '../../api/axiosConfig.js';

export const MoreRate = (props) => {
    const location = useLocation();
    let {rateId} = useParams();
    // const rateId = location.state ? location.state.rateId : null;
    // const rateId = location.state.rateId;
    const [rateDetails, setRateDetails] = useState(null);

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

    }, [rateId]);

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
                        <Link to={`/card`} className="btn btn-primary">
                            Подробнее
                        </Link>
                    </>
                )}
            </div>
        );
    } else {
        return <div>Rate не существует или не содержит свойство rateId</div>;
    }
};


