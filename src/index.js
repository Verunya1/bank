import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css'
import AuthContent from "./components/AuthContent";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* Передаем компонент App для отображения */}
        <App />
        {/*<AuthContent/>*/}
    </React.StrictMode>
);

// root.render(<App />);

