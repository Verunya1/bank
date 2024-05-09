import React, {Fragment, useState} from "react";
import api from "../api/axiosConfig";


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

    const handleSelectChange = (e) => {
        setSelectedOperation(e.target.value);
    };

    const handleSubmit = async () => {
        const dataToSend = {
            nameTransaction: nameTransaction,
            typeTransaction: selectedOperation,
            sum: parseFloat(sum),
            product: {
                numberScore: productNumberScore
            }
        };

        try {
            // const response = await fetch('http/localhost:8080/vBank/createTransaction', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(dataToSend)
            // });

            const response = await api.post(`/createTransaction`, dataToSend);
            console.log(dataToSend);
            console.log(response.data);
            // Дополнительная обработка данных, если необходимо

            const responseData = await response.json();
            console.log('Данные успешно отправлены в базу данных', responseData);

        } catch (error) {
            console.error('Ошибка при отправке данных в базу данных', error);
        }
    };

    return (
        <Fragment>
            <h1>CreateTransaction</h1>
            <div className="row g-2">
                <div className="col-md">
                    <div className="form-group">
                        <label htmlFor="numberInput">Введите номер карты:</label>
                        <input type="number" class="form-control"  min="0" value={productNumberScore}
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
                   <input type="number" class="form-control" min="0" step="0.01" value={sum} onChange={(e) => setSum(e.target.value)} />

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

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Отправить</button>

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