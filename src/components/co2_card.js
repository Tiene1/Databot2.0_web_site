import React, { useState, useEffect } from 'react';
import CO2_icon from '../images/CO2_icon.png';
import './co2_card.css';

function Co2_card({ co2 }) {
    const [co2Value, setCo2Value] = useState(co2);
    const [isAlertActive, setAlertActive] = useState(co2 >= 2000);

    useEffect(() => {
        const interval = setInterval(() => {
            setCo2Value(co2);

            // Vérifier si la valeur atteint ou dépasse 5000 ppm
            if (co2 >= 2000) {
                setAlertActive(true);
            } else {
                setAlertActive(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [co2]);

    return (
        <div>
            <div className="co2_card">
                <img src={CO2_icon} alt="icone co2" className="co2_icon" />
                <span className="co2">CO2</span>
                <span className="co2_value">{co2Value}</span>
                <span className="ppm">ppm</span>
                <div className={`co2_alert ${isAlertActive ? 'alert-active1' : ''}`}></div>
            </div>
        </div>
    );
}

export default Co2_card;
