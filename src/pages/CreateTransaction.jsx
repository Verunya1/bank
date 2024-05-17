import React, {Fragment, useEffect, useState} from "react";
import api from "../api/axiosConfig";
import {jwtDecode} from "jwt-decode";



export const CreateTransaction = () => {
    const [nameTransaction, setNameTransaction] = useState('');
    // const [typeTransaction, setTypeTransaction] = useState('');
    const [sum, setSum] = useState('');
    const [productNumberScore, setProductNumberScore] = useState('');

    const [selectedOperation, setSelectedOperation] = useState('');


    const [userRole, setUserRole] = useState(null);
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
        determineUserRole();
    }, []);


    const handleSelectChange = (e) => {
        setSelectedOperation(e.target.value);
    };

    const handleSubmit = async (userId) => {

        const dataToSend = {  // поправить тело
            nameTransaction: nameTransaction,
            typeTransaction: selectedOperation,
            sum: parseFloat(sum),
            product: {
                numberScore: productNumberScore
            },

            user: {id: userId}
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
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={() => handleSubmit(userId)}>Отправить
                    </button>
                </>
            )}
        </Fragment>
    );
}

export default CreateTransaction;