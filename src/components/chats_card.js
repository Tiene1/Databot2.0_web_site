import React, { useState, useEffect } from 'react';
import './chats_card.css';
import chats_icon from '../images/chats_icon.png';

function Chats_card({ co2, voc, humidite, temperature }) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [suggestionMessage, setSuggestionMessage] = useState('');

    useEffect(() => {
        let alertTimer;

        const showAlertMessage = (message) => {
            setAlertMessage(message);
            setSuggestionMessage(''); // Réinitialise le message de suggestion
            setShowAlert(true);

            alertTimer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        };

        const showSuggestionMessage = (message) => {
            setSuggestionMessage(message);
            setAlertMessage(''); // Réinitialise le message d'alerte
            setShowAlert(true);

            alertTimer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        };

        // Vérifier toutes les conditions
        if (co2 >= 2000) {
            showAlertMessage('Seuil de CO2 atteint. Veuillez aérer la pièce ou utiliser un dispositif de ventilation.');
        } else if (voc >= 800) {
            showAlertMessage("Seuil de COV atteint. Assurez-vous de ventiler la zone ou utilisez des purificateurs d'air.");
        } else if (humidite >= 60) {
            showAlertMessage("Seuil d'humidité atteint. vérifiez si les sources d'humidité, telles que les fuites ou les infiltrations, sont correctement traitées.");
        } else if (temperature >= 38) {
            showAlertMessage('Température élevée. Vérifiez la climatisation, ou ouvrez les fenêtres pour une ventilation.');
        } else {
            // Aucune condition vérifiée, affiche la suggestion par défaut en continu
            showSuggestionMessage('Tout est normal pour le moment. Aucune anomalie détectée.');
        }

        return () => {
            clearTimeout(alertTimer);
        };
    }, [co2, voc, humidite, temperature]);

    return (
        <div>
            <div className="chats_card">
                <img src={chats_icon} alt="icone de message" className="chats_icon" />
                <div className="chats_line"></div>
                <div className="chats">
                    {showAlert && (
                        <div className="messages">
                            {alertMessage && (
                                <div className="alert">
                                    <span className="alert-icon">🚨</span>
                                    <span className="alert-text">{alertMessage}</span>
                                </div>
                            )}
                            {suggestionMessage && (
                                <div className="suggestion">
                                    <span className="suggestion-icon">💡</span>
                                    <span className="suggestion-text">{suggestionMessage}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chats_card;
