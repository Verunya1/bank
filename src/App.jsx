// import React from 'react';
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import {Items} from "./components/Items";
// // import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// // import {BrowserRouter, Route, Switch} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Обновляем импорт
// import {Home} from "./components/pages/Home";
// import {CreateTransaction} from "./components/pages/CreateTransaction";
// import {Transaction} from "./components/pages/Transaction";
// import {Card} from "./components/pages/Card";
// import {OffersOnAccounts} from "./components/pages/OffersOnAccounts";
// import {PersonalAccount} from "./components/pages/PersonalAccount";
//
//
// function App() {
// // class App extends React.Component {
// //     constructor(props) {
// //         super(props)
// //         this.state = {
// //             items: [
// //                 {
// //                     id:1,
// //                     type: "Replenishment",
// //                     sum: "$5.99",
// //                     Operation: "Подписка",
// //                     dateTransaction: "05/24/2016"
// //                 }
// //             ]
// //         };
// //     }
// //     render() {
//         return (
//             // <div className="wrapper">
//             //     <Header/>
//             //     <Items items={this.state.items}/>
//             //     <Footer/>
//             // </div>
//             <Router>
//                 <Routes>
//                     <Route path={'/'} exact element={Home} />
//                     <Route path={'/createTransaction'}  element={CreateTransaction} />
//                     <Route path={'/transaction'}  element={Transaction} />
//                     <Route path={'/card'}  element={Card} />
//                     <Route path={'/rate'}  element={OffersOnAccounts} />
//                     <Route path={'/personalAccount'}  element={PersonalAccount} />
//                 </Routes>
//             </Router>
//         );
//     // }
// }
//
// export default App;
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; // Обновляем импорт

import {Home} from "./pages/home/Home";
import {CreateTransaction} from './pages/CreateTransaction';
import {Transaction} from "./pages/Transaction";
import {Card} from "./pages/card/Card";
import {OffersOnAccounts} from "./pages/rate/OffersOnAccounts";
import {PersonalAccount} from "./pages/lk/PersonalAccount";
import {Navbar} from "./components/Navbar";
import Footer from "./components/Footer";
import {MoreRate} from "./pages/rate/MoreRate";
import LoginForm from "./components/LoginForm";
import Registration from "./components/Registration";



function App() {
    return (
        <Router> {/* Заменяем BrowserRouter на Router */}
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'vBank/createTransaction'} element={<CreateTransaction/>}/>
                <Route path={'/vBank/getTransactionAll'} element={<Transaction/>}/>
                <Route path={'/card'} element={<Card/>}/>
                <Route path={'/vBank/getRateAll'} element={<OffersOnAccounts/>}/>
                <Route path={'/personalAccount'} element={<PersonalAccount/>}/>
                <Route path={'/vBank/getRate/:rateId'} element={<MoreRate/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/register'} element={<Registration/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;