import React from 'react';

const Header = () => {
    return (
        <header>
            <div>
                <span className="logo">VBank</span>
                <ul className="nav">
                    <li><a href="/">Главная</a></li>
                    <li><a href="/src/pages/Transaction">Транзакции</a></li>
                    <li><a href="/product">Карты</a></li>
                    <li><a href="/rate">Предложения</a></li>
                    <li><a href="/contact">Контакты</a></li>
                    <li><a href="/about">О нас</a></li>
                    {/*<li><a href="/login">Login</a></li>*/}
                    {/*<li><a href="/register">Register</a></li>*/}
                </ul>
            </div>
            <div className="presentation"></div>
        </header>
    )
}

export default Header;
