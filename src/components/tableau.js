// Tableau.js
import React, { useState, useEffect } from 'react';
import './tableau.css';

const Tableau = () => {
  const [dataEntries, setDataEntries] = useState([]);
  const [formattedYesterday, setFormattedYesterday] = useState('');

  const fetchCurrentData = async () => {
    try {
      const response = await fetch('https://s-p5.com/tiene/datamonitor/display_data.php');
      const jsonData = await response.json();

      // Assurez-vous que la structure de jsonData est correcte
      if (Array.isArray(jsonData)) {
        // Mettez à jour les données dans le state local
        setDataEntries(jsonData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'API :', error);
    }
  };

  const fetchPreviousDayData = async () => {
    try {
      const response = await fetch('https://s-p5.com/tiene/datamonitor/previous_day_data.php');
      const jsonData = await response.json();

      // Assurez-vous que la structure de jsonData est correcte
      if (Array.isArray(jsonData)) {
        // Mettez à jour les données dans le state local
        setDataEntries(jsonData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du jour précédent :', error);
    }
  };

  useEffect(() => {
    // Obtenez la date d'hier au format souhaité
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;

    // Mettez à jour l'état avec la date d'hier
    setFormattedYesterday(formattedYesterday);

    // Lancez la requête initiale
    fetchCurrentData();

    // Lancez une requête toutes les 1 minute
    const intervalId = setInterval(() => {
      fetchCurrentData();
    }, 60000); // 1 minute en millisecondes

    // Nettoyez l'intervalle lors du démontage du composant
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Le tableau de dépendances vide signifie que l'effet ne sera exécuté qu'une seule fois, au montage du composant

  useEffect(() => {
    // Vérifiez si nous sommes dans un nouveau jour
    const isNewDay = () => {
      if (dataEntries.length > 0) {
        const firstEntryDate = new Date(dataEntries[0].date_reception);
        const currentDate = new Date();
        return firstEntryDate.getDate() !== currentDate.getDate();
      }
      return false;
    };

    // Si nous sommes dans un nouveau jour, effectuer une nouvelle requête pour obtenir les 50 dernières entrées du jour précédent
    if (isNewDay()) {
      fetchPreviousDayData();
    }
  }, [dataEntries]); // Cette dépendance garantit que l'effet est déclenché chaque fois que dataEntries est mis à jour

  return (
    <div className="tableau-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>CO2</th>
            <th>COV</th>
            <th>Humidité</th>
            <th>Température</th>
          </tr>
        </thead>
        <tbody>
          {dataEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date_reception}</td>
              <td>{entry.co2}</td>
              <td>{entry.voc}</td>
              <td>{entry.humidite}</td>
              <td>{entry.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tableau;
