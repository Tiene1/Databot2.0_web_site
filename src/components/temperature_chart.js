import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './temperature_chart.css';

function Temperature_chart({ temperature }) {
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      const newTemperatureData = { time: currentTime, temperature };

      if (temperatureData.length >= 10) {
        setTemperatureData((prevData) => prevData.slice(1));
      }

      setTemperatureData((prevData) => [...prevData, newTemperatureData]);
    }, 3000); // Répète toutes les 3 secondes (ou ajuste l'intervalle de temps en fonction de tes besoins).

    return () => clearInterval(interval);
  }, [temperature, temperatureData]);

  return (
    <div className="temperature_chart">
      <h1 className="temperature_title">Température (°C)</h1>
      <LineChart width={345} height={220} data={temperatureData} margin={{ right: 5, top: 10 }}>
        <XAxis dataKey="time" tick={{ fontSize: 9 }} />
        <YAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="rgb(255, 99, 71)"
        />
      </LineChart>
    </div>
  );
}

export default Temperature_chart;
