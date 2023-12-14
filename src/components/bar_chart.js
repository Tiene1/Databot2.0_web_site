import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './bar_chart.css';

const initialData = [
  { date: '2023-12-08', co2: 581, voc: 189 },
  { date: '2023-12-09', co2: 624, voc: 708 },
  { date: '2023-12-10', co2: 458, voc: 96 },
  { date: '2023-12-11', co2: 713, voc: 159 },
  { date: '2023-12-12', co2: 552, voc: 634 },
];

function BarChartComponent() {
  const [maxValues, setMaxValues] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s-p5.com/tiene/datamonitor/display_data.php');
        const jsonData = await response.json();

        // Assurez-vous que la structure de jsonData est correcte
        if (Array.isArray(jsonData)) {
          // Mappez les données pour extraire les valeurs maximales de CO2 et de COV
          const maxValuesFromAPI = jsonData.map(dayData => {
            const maxCO2 = Math.max(...dayData.map(entry => entry.co2));
            const maxVOC = Math.max(...dayData.map(entry => entry.voc));

            return { date: dayData[0].date_reception, co2: maxCO2, voc: maxVOC };
          });

          // Mettez à jour les valeurs maximales dans le state local
          setMaxValues(maxValuesFromAPI);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      }
    };

    fetchData();
  }, []); // Cette dépendance vide signifie que l'effet ne sera exécuté qu'une fois, au montage du composant

  return (
    <div className="bar_chart">
      <h1 className="bar_chart_title">Valeurs maximales des paramètres</h1>
      <div className="bar_chart_container">
        <BarChart width={600} height={225} data={maxValues}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 9 }} />
          <YAxis domain={[0, 800]} tick={{ fontSize: 9 }} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} iconSize={10} iconType="square" align="center" wrapperStyle={{ width: '100%' }} />
          <Bar dataKey="co2" name="CO2" fill="rgb(173, 255, 47, 1)" />
          <Bar dataKey="voc" name="COV" fill="rgb(173, 255, 47, 0.5)" />
        </BarChart>
      </div>
    </div>
  );
}

export default BarChartComponent;
