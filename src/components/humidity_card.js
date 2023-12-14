import React, { useState, useEffect } from 'react';
import Humidity_icon from '../images/humidity_icon.png';
import './humidity_card.css';

function Humidity_card({ humidite }) {
    const [humidityValue, setHumidityValue] = useState(humidite);
    const [isAlertActive, setAlertActive] = useState(humidite >= 60); // Mettez le seuil souhaité ici

    useEffect(() => {
        const interval = setInterval(() => {
            setHumidityValue(humidite);

            // Vérifiez si la valeur atteint ou dépasse le seuil souhaité (60 % d'humidité dans cet exemple)
            if (humidite >= 60) {
                setAlertActive(true);
            } else {
                setAlertActive(false);
            }
        }, 1000); // Mettez l'intervalle souhaité ici

        return () => {
            clearInterval(interval);
        };
    }, [humidite]);

    return (
        <div>
            <div className="humidity_card">
                <img src={Humidity_icon} alt="icone humidité" className="humidity_icon" />
                <span className="humidity">Humidité</span>
                <span className="humidity_value">{humidityValue}</span>
                <span className="pourcentage">%</span>
                <div className={`humidity_alert ${isAlertActive ? 'alert-active3' : ''}`}></div>
            </div>
        </div>
    );
}

export default Humidity_card;
