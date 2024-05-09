import React, {Fragment, useEffect, useState} from "react";
import './card.css'
import api from "../../api/axiosConfig";


// export const Card = () => {
//     return (
//         <Fragment>
//             <h1>Карточка</h1>
//             <div className="wrapper">
//                 <div className="card px-4">
//                     <div className=" my-3">
//                         <p className="h8">Мои карты</p>
//                     </div>
//                     <div className="debit-card mb-3">
//                         <div className="d-flex flex-column h-100">
//                             <label className="d-block">
//                                 <div className="d-flex position-relative">
//                                     <div>
//                                         <img src="https://www.freepnglogos.com/uploads/visa-inc-logo-png-11.png"
//                                              className="visa"
//                                              alt=""/>
//                                         <p className="mt-2 mb-4 text-white fw-bold">Сай Кумар</p>
//                                         <p className="text-white fw-bold">1200.90</p>
//                                     </div>
//                                 </div>
//                             </label>
//                             <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
//                                 <p>4989 1237 1234 4532</p>
//                                 <p>01/24</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="debit-card card-2 mb-4">
//                         <div className="d-flex flex-column h-100">
//                             <label className="d-block">
//                                 <div className="d-flex position-relative">
//                                     <div>
//                                         <img
//                                             src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-png-transparent-svg-vector-bie-supply-0.png"
//                                             alt="master" className="master"/>
//                                         <p className="text-white fw-bold">Сай Кумар</p>
//                                         <p className="text-white fw-bold">2000.90</p>
//                                     </div>
//                                 </div>
//                             </label>
//                             <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
//                                 <p className="m-0">5540 2345 3453 2343</p>
//                                 <p className="m-0">05/23</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }
//    const getCards = async () => {
//         try {
//             const response = await api.get('/getProductAll');
//             setCards(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error("Error fetching transactions: ", error);
//         }
//     }

export const Card = () => {
    const [cards, setCards] = useState([]);



    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/getProductAll');
                setCards(response.data);
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
            <h1>Карточка</h1>
            <div className="wrapper">
                <div className="card px-4">
                    <div className="my-3">
                        <p className="h8">Мои карты</p>
                    </div>
                    {cards.map((card, index) => (
                        <div key={index} className="debit-card mb-3">
                            <div className="d-flex flex-column h-100">
                                <label className="d-block">
                                    <div className="d-flex position-relative">
                                        <div>
                                            <img src={card.image} className={card.type === 'visa' ? 'visa' : 'master'} alt={card.type}/>
                                            <p className="mt-2 mb-4 text-white fw-bold">{card.numberScore}</p>
                                            <p className="text-white fw-bold">{card.balance}$</p>
                                        </div>
                                    </div>
                                </label>
                                <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                                    <p></p>
                                    <p>{card.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};
