import React from 'react';

const ImageComponent = ({ imageUrl }) => {
    let imageSrc;

    // Выбираем картинку в зависимости от данных, пришедших с сервера
    if (imageUrl === 'Visa') {
        imageSrc = "https://www.freepnglogos.com/uploads/visa-inc-logo-png-11.png";
    } else if (imageUrl === 'Mastercard') {
        imageSrc = 'https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-png-transparent-svg-vector-bie-supply-0.png';
    } else {
        imageSrc = 'https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-logotip-mir-prozrachnii-fon-6.png';
    }

    return (
        <img src={imageSrc} alt="Selected Image" style={{ width: "50px", height: '20px', objectFit: 'fill' }}/>
    );
};

export default ImageComponent;