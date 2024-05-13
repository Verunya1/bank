// import React, {Fragment} from "react";
// import api from '../api/axiosConfig';
// import {useState, useEffect} from "react";
// // import axios from "axios";
//
//
// export const Transaction=()=>{
//     const [transactions, setTransaction] = useState([]);
//     const getTransaction = async ()=>{
//         const response = await api.get('/getTransactionAll')
//         // const response = await axios.get("http://localhost:8080/vBank/getTransactionAll")
//         setTransaction(response.data);
//         console.log(response.data)
//     }
//     useEffect(()=>{
//         getTransaction();
//     },[])
//     return(
//         <Fragment>
//             <h1>Transaction</h1>
//             <ul>
//                 {transactions.map(transaction => (
//                     <li key={transaction.id}>{transaction.typeTransaction} - {transaction.dateTransaction}</li>
//                 ))}
//             </ul>
//             <table className="table">
//                 <thead>
//                 <tr>
//                     {/*<th scope="col">#</th>*/}
//                     <th scope="col">Транзакция</th>
//                     <th scope="col">Сумма</th>
//                     <th scope="col">Тип</th>
//                     <th scope="col">Дата</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 <tr>
//                     <td>Mark</td>
//                     <td>Otto</td>
//                     <td>@mdo</td>
//                     <span>{new Date().toLocaleDateString()}</span>
//                 </tr>
//                 <tr>
//                     <td>Jacob</td>
//                     <td>Thornton</td>
//                     <td>@fat</td>
//                     <span>{new Date().toLocaleDateString()}</span>
//                 </tr>
//                 <tr>
//                     <td>Larry the Bird</td>
//                     <td>@twitter</td>
//                     <td>@twitter</td>
//                     <span>{new Date().toLocaleDateString()}</span>
//                 </tr>
//                 </tbody>
//             </table>
//         </Fragment>
//     )
// }
//
// //import React, { Fragment, useState, useEffect } from "react";
// // import axios from "axios";
// //
// // export const Transaction = () => {
// //     const [transactions, setTransactions] = useState([]);
// //
// //     useEffect(() => {
// //         axios.get("http://localhost:3000/api/transactions")
// //             .then(response => {
// //                 setTransactions(response.data);
// //             })
// //             .catch(error => {
// //                 console.log(error);
// //             });
// //     }, []);
// //
// //     return (
// //         <Fragment>
// //             <h1>Transaction</h1>
// //             <table className="table">
// //                 <thead>
// //                     <tr>
// //                         <th scope="col">Транзакция</th>
// //                         <th scope="col">Сумма</th>
// //                         <th scope="col">Тип</th>
// //                         <th scope="col">Дата</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {transactions.map(transaction => (
// //                         <tr key={transaction.id}>
// //                             <td>{transaction.transaction}</td>
// //                             <td>{transaction.amount}</td>
// //                             <td>{transaction.type}</td>
// //                             <td>{transaction.date}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </Fragment>
// //     );
// // }

import React, {Fragment} from "react";
import api from '../api/axiosConfig';
import {useState, useEffect} from "react";

export const Transaction = () => {
    const [transactions, setTransactions] = useState([]);

    // const getTransactions = async () => {
    //     try {
    //         const response = await api.get('/getTransactionAll');
    //         setTransactions(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error("Error fetching transactions: ", error);
    //     }
    // }
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/getTransactionAll');
                setTransactions(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        }

        fetchTransactions(); // Вызываем функцию fetchTransactions при монтировании компонента

        return () => {
            // Здесь можно добавить очистку (cleanup) если необходимо
        }
    }, []); // Пус

    return (
        <Fragment>
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
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.numberScore}</td>
                        <td>{transaction.nameTransaction}</td>
                        <td>{transaction.sum}</td>
                        <td>{transaction.typeTransaction}</td>
                        <td>{transaction.dateTransaction}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}