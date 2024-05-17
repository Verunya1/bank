import React, {Fragment, useEffect, useState} from "react";
import api from "../api/axiosConfig";
import {useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";


// export const CreateTransaction = () => {
//     return (
//         <Fragment>
//             <h1>CreateTransaction</h1>
//             <div className="row g-2">
//                 <div className="col-md">
//                     <div className="form-group">
//                         <label htmlFor="numberInput">Введите номер карты:</label>
//                         <input type="number" className="form-control" id="numberInput" name="numberInput" min="0"
//                                required/>
//                     </div>
//                 </div>
//             </div>
//             <div className="row g-2">
//                 <div className="col-md">
//                     <div className="form-group">
//                         <label htmlFor="numberInput">Введите сумму операции:</label>
//                         <input type="number" className="form-control" id="numberInput" name="numberInput"
//                                min="0"
//                                step="0.01" required/>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-md">
//                 <div className="form-floating">
//                     <select className="form-select" id="floatingSelectGrid"
//                             aria-label="Floating label select example">
//                         <option selected>Выберите операцию</option>
//                         <option value="writeDowns">списание</option>
//                         <option value="replenishment">начисление</option>
//                         {/*<option value="3">Three</option>*/}
//                     </select>
//                     <label htmlFor="floatingSelectGrid">Откройте меню</label>
//                 </div>
//             </div>
//
//             <button type="submit" className="btn btn-primary">Отправить</button>
//
//             <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
//             <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
//         </Fragment>
//     )
// }
export const CreateTransaction = () => {
    const [nameTransaction, setNameTransaction] = useState('');
    // const [typeTransaction, setTypeTransaction] = useState('');
    const [sum, setSum] = useState('');
    const [productNumberScore, setProductNumberScore] = useState('');

    const [selectedOperation, setSelectedOperation] = useState('');


    const [userRole, setUserRole] = useState(null);
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
        determineUserRole();
        // if (userId) {
        //     handleSubmit(userId);
        // }
    }, []);


    const handleSelectChange = (e) => {
        setSelectedOperation(e.target.value);
    };
    //  "typeTransaction" : "writeDowns",
    //     "sum": 100.00,
    //     "product": {
    //     "numberScore": "12"
    //   }
    //     ,
    //   "user": {
    //     "id": "6"
    //   }
    const handleSubmit = async (userId) => {

        const dataToSend = {  // поправить тело
            nameTransaction: nameTransaction,
            typeTransaction: selectedOperation,
            sum: parseFloat(sum),
            product: {
                numberScore: productNumberScore
            },
            // user:{ id: Number(userId)}
            user: {id: userId}
            // userId: userId
        };
        console.log(dataToSend);
        try {
            const response = await api.post(`/createTransaction`, dataToSend);
            console.log(dataToSend);
            console.log(response.data);
            // Дополнительная обработка данных, если необходимо

            // const responseData = await response.json();
            console.log('Данные успешно отправлены в базу данных', response.data);

        } catch (error) {
            console.error('Ошибка при отправке данных в базу данных', error);
        }
    };
    // useEffect(() => {
    //     determineUserRole();
    // }, [userId]);


    return (
        <Fragment>
            {userRole && userId && (
                <>
                    <h1>CreateTransaction</h1>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="numberInput">Введите номер карты:</label>
                                <input type="number" class="form-control" min="0" value={productNumberScore}
                                       onChange={(e) => setProductNumberScore(e.target.value)}/>

                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="nameInput">Введите наименование транзакции:</label>
                                <input type="text" class="form-control" value={nameTransaction}
                                       onChange={(e) => setNameTransaction(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="amountInput">Введите сумму операции:</label>
                                <input type="number" class="form-control" min="0" step="0.01" value={sum}
                                       onChange={(e) => setSum(e.target.value)}/>

                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" value={selectedOperation} onChange={handleSelectChange}>
                                <option selected>Выберите операцию</option>
                                <option value="writeDowns">списание</option>
                                <option value="replenishment">начисление</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">Откройте меню</label>
                            {/*<input type="text" value={typeTransaction} onChange={(e) => setTypeTransaction(e.target.value)} />*/}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={() => handleSubmit(userId)}>Отправить
                    </button>
                </>
            )}
        </Fragment>
        //  const CreateTransaction = () => {
        //     const [nameTransaction, setNameTransaction] = useState('');
        //     const [typeTransaction, setTypeTransaction] = useState('');
        //     const [sum, setSum] = useState('');
        //     const [productNumberScore, setProductNumberScore] = useState('');
        //
        //     const handleSubmit = async () => {
        //         const dataToSend = {
        //             nameTransaction: nameTransaction,
        //             typeTransaction: typeTransaction,
        //             sum: parseFloat(sum),
        //             product: {
        //                 numberScore: productNumberScore
        //             }
        //         };
        //
        //         try {
        //             const response = await api.post('/createTransaction', dataToSend);
        //             console.log(response.data);
        //
        //         } catch (error) {
        //             console.error('Ошибка при отправке данных в базу данных', error);
        //         }
        //     };
        //
        //     return (
        //         <div>
        //             <label>Наименование транзакции:</label>
        //             <input type="text" value={nameTransaction} onChange={(e) => setNameTransaction(e.target.value)} />
        //
        //             <label>Тип транзакции:</label>
        //             <input type="text" value={typeTransaction} onChange={(e) => setTypeTransaction(e.target.value)} />
        //
        //             <label>Сумма:</label>
        //             <input type="number" value={sum} onChange={(e) => setSum(e.target.value)} />
        //
        //             <label>Номер счета продукта:</label>
        //             <input type="text" value={productNumberScore} onChange={(e) => setProductNumberScore(e.target.value)} />
        //
        //             <button onClick={handleSubmit}>Отправить</button>
        //         </div>
        //     );
        // };

    );
}

export default CreateTransaction;