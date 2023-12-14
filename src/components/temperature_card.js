import React, { useState, useEffect } from 'react';
import Temperature_icon from '../images/Thermometer_icon.png';
import './temperature_card.css';

function Temperature_card({ temperature }) {
    const [temperatureValue, setTemperatureValue] = useState(temperature);
    const [isAlertActive, setAlertActive] = useState(temperature >= 38); // Mettez le seuil souhaité ici

    useEffect(() => {
        const interval = setInterval(() => {
            setTemperatureValue(temperature);

            // Vérifiez si la température atteint ou dépasse le seuil souhaité (40°C dans cet exemple)
            if (temperature >= 38) {
                setAlertActive(true);
            } else {
                setAlertActive(false);
            }
        }, 1000); // Mettez l'intervalle souhaité ici

        return () => {
            clearInterval(interval);
        };
    }, [temperature]);

    return (
        <div>
            <div className="temperature_card">
                <img src={Temperature_icon} alt="icone Température" className="temperature_icon" />
                <span className="temperature">Température</span>
                <span className="temperature_value">{temperatureValue}</span>
                <span className="degre">°C</span>
                <div className={`temperature_alert ${isAlertActive ? 'alert-active4' : ''}`}></div>
            </div>
        </div>
    );
}

export default Temperature_card;
