import React, { useState, useEffect } from 'react';
import './dashboardSoutenance.css';
import NavBarre from '../components/navBarre.js';
import Co2_card from '../components/co2_card.js';
import Voc_card from '../components/voc_card.js';
import Humidity_card from '../components/humidity_card.js';
import Temperature_card from '../components/temperature_card.js';
import Co2_chart from '../components/co2_chart.js';
import Voc_chart from '../components/voc_chart.js';
import Temperature_chart from '../components/temperature_chart.js';
import Humidity_chart from '../components/humidity_chart.js';
import Bar_chart from '../components/bar_chart.js';
import Chats_card from '../components/chats_card.js';

function DashboardSoutenance() {
    const [data, setData] = useState({ co2: 0, voc: 0, humidite: 0, temperature: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://s-p5.com/tiene/datamonitor/display_data.php'); // Remplacez 'URL_DE_VOTRE_API_PHP' par l'URL réelle de votre API PHP
                const jsonData = await response.json();
                if (jsonData && jsonData.length > 0) {
                    const latestData = jsonData[0];
                    setData(latestData);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData(); // Effectuez la première récupération au chargement initial

        // Configurez un intervalle pour récupérer les données toutes les 5 secondes (ou à l'intervalle que vous préférez)
        const interval = setInterval(() => {
            fetchData();
        }, 1000); // Récupérez les données toutes les 1 secondes

        // Nettoyez l'intervalle lorsque le composant est démonté
        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <div>
            <NavBarre/>
            {/* <header className = "header1">Aperçu - Salle de soutenance</header>
            <Co2_card co2={data.co2} />
            <Voc_card voc={data.voc} />
            <Humidity_card humidite={data.humidite} />
            <Temperature_card temperature={data.temperature} />
            <Co2_chart co2={data.co2} />
            <Voc_chart voc={data.voc} />
            <Temperature_chart temperature={data.temperature} />
            <Humidity_chart humidite={data.humidite} />
            <Bar_chart co2={data.co2} voc={data.voc} />
            <Chats_card co2={data.co2} voc={data.voc} humidite={data.humidite} temperature={data.temperature} /> */}
        </div>
    );
}

export default DashboardSoutenance;
