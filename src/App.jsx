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