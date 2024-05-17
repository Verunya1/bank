import React, {Fragment} from "react";
import api from '../api/axiosConfig';
import {useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export const Transaction = () => {
    const [transactions, setTransactions] = useState([]);

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
                const response = await api.get(`/getTransactionsUsers/${userId}`);
                // const response = await api.get(`/getTransactionsUsers/6`);
                setTransactions(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        }

        fetchTransactions(); // Вызываем функцию fetchTransactions при монтировании компонента
        // determineUserRole();
        return () => {
            // Здесь можно добавить очистку (cleanup) если необходимо
        }

    }, []); // Пус


    return (
        <Fragment>
            {userRole && (
                <>
            <h1>Transaction</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Номер счета</th>
                    <th scope="col">Транзакция</th>
                    <th scope="col">Сумма</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Дата</th>
                </tr>
                </thead>
                <tbody>
                {transactions.sort((a, b) => new Date(b.dateTransaction) - new Date(a.dateTransaction)).map(transaction => (                    <tr key={transaction.id}>
                        <td>{transaction.numberScore}</td>
                        <td>{transaction.nameTransaction}</td>
                        <td>{transaction.sum}</td>
                        {/*<td>{transaction.typeTransaction}</td>*/}
                        <td>{transaction.typeTransaction === 'writeDowns' ? 'списание' : 'начисление'}</td>
                        <td>{transaction.dateTransaction}</td>
                    </tr>
                ))}
                </tbody>
            </table>
                </>
            )}
        </Fragment>
    )
}