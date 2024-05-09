import React, {Fragment, useEffect, useState} from "react";
import './home.css'
import api from "../../api/axiosConfig";
// import { Pie } from 'react-chartjs-2';



// export const Home = () => {
//     const [cards, setCards] = useState([]);
//     const getCards = async () => {
//         try {
//             const response = await api.get('/getProductAll');
//             setCards(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error("Error fetching transactions: ", error);
//         }
//     }
//
//     // useEffect(() => {
//     //     getTransactions();
//     // }, );
//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const response = await api.get('/getProductAll');
//                 setCards(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error("Error fetching transactions: ", error);
//             }
//         }
//
//         fetchTransactions(); // Вызываем функцию fetchTransactions при монтировании компонента
//
//         return () => {
//             // Здесь можно добавить очистку (cleanup) если необходимо
//         }
//     }, []); // Пус
//     return (
//         <Fragment>
//             <h1>Home</h1>
//             <div className="presentation"></div>
//             <div className="container">
//                 <div className="row m-0">
//                     <div className="col-md-7 col-12">
//                         <div className="row">
//                             <div className="col-12 mb-4">
//                                 <div className="row box-right">
//                                     <div className="col-md-8 ps-0 "><p className="ps-3 textmuted fw-bold h6 mb-0">Общая
//                                         сумма</p> <p className="h1 fw-bold d-flex"><span
//                                         className=" fas fa-dollar-sign textmuted pe-1 h6 align-text-top mt-1"></span>84,254
//                                     </p></div>
//                                     <div className="col-md-4"><p className="p-blue"><span
//                                         className="fas fa-circle pe-2"></span>Mastercard </p> <p
//                                         className="fw-bold mb-3">
//                                         <span className="fas fa-dollar-sign pe-1"></span>1254 <span
//                                         className="textmuted">.50</span></p> <p className="p-org"><span
//                                         className="fas fa-circle pe-2"></span>Мир</p>
//                                         <p className="fw-bold"><span
//                                         className="fas fa-dollar-sign pe-1"></span>00<span
//                                         className="textmuted">.00</span></p></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }
export const Home = () => {
    const [cards, setCards] = useState([]);

    const getTotalAmount = () => {
        if (cards.length === 0) {
            return 0; // Возвращаем 0, если массив пустой
        }
        return cards.reduce((total, card) => total + card.balance, 0);
    }

    const getCardAmount = (cardNumber) => {
        const card = cards.find(card => card.numberScore === cardNumber);
        return card ? card.balance : 0;
    }

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await api.get('/getProductAll');
                setCards(response.data);
            } catch (error) {
                console.error("Error fetching cards: ", error);
            }
        }

        fetchCards(); // Fetch data from server when component mounts
    }, []);

    // const getChartData = () => {
    //     const labels = cards.map(card => card.numberScore);
    //     const data = cards.map(card => (card.amount / getTotalAmount() * 100).toFixed(2));
    //     return {
    //         labels: labels,
    //         datasets: [{
    //             data: data,
    //             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#63FF84'], // Цвета для каждой секции
    //         }]
    //     };
    // }
    return (
        <Fragment>
            <h1>Home</h1>
            <div className="presentation"></div>
            <div className="container">
                <div className="row m-0">
                    <div className="col-md-7 col-12">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="row box-right">
                                    <div className="col-md-8 ps-0">
                                        <p className="ps-3 text-muted fw-bold h6 mb-0">Общая сумма</p>
                                        <p className="h1 fw-bold d-flex">
                                            <span
                                                className="fa fa-dollar-sign text-muted pe-1 h6 align-text-top mt-1"></span>$
                                            {getTotalAmount()}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        {cards.map(card => (
                                            <div key={card.numberScore}>
                                                <p className="p-blue">
                                                    {card.numberScore}
                                                </p>
                                                <p className="fw-bold">
                                                    <span
                                                        className="fas fa-dollar-sign pe-1"></span>${getCardAmount(card.numberScore)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}