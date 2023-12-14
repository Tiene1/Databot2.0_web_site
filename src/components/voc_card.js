import React, { useState, useEffect } from 'react';
import VOC_icon from '../images/voc_icon.png';
import './voc_card.css';

function Voc_card({ voc }) {
    const [vocValue, setVocValue] = useState(voc);
    const [isAlertActive, setAlertActive] = useState(voc >= 800); // Mettez le seuil souhaité ici

    useEffect(() => {
        const interval = setInterval(() => {
            setVocValue(voc);

            // Vérifiez si la valeur atteint ou dépasse le seuil souhaité (2000 ppb dans cet exemple)
            if (voc >= 800) {
                setAlertActive(true);
            } else {
                setAlertActive(false);
            }
        }, 1000); // Mettez l'intervalle souhaité ici

        return () => {
            clearInterval(interval);
        };
    }, [voc]);

    return (
        <div>
            <div className="voc_card">
                <img src={VOC_icon} alt="icone voc" className="voc_icon" />
                <span className="voc">COV</span>
                <span className="voc_value">{vocValue}</span>
                <span className="ppb">ppb</span>
                <div className={`voc_alert ${isAlertActive ? 'alert-active2' : ''}`}></div>
            </div>
        </div>
    );
}

export default Voc_card;
