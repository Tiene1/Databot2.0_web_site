import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './humidity_chart.css';

function Humidity_chart({ humidite }) {
  const [humidityData, setHumidityData] = useState(Number(humidite));

  useEffect(() => {
    const interval = setInterval(() => {
      setHumidityData(Number(humidite));
    }, 3000);

    return () => clearInterval(interval);
  }, [humidite]);

  const data = [
    { name: 'Humidity', value: humidityData },
    { name: 'Complement', value: 100 - humidityData },
  ];

  const COLORS = ['rgb(135, 206, 255, 1)', '#808080'];

  return (
    <div>
      <div className="humidity_chart">
        <h1 className="title">Humidité (%)</h1>
        <div className="legend1"></div>
        <div className="legend2"></div>
        <div className="legend3"></div>
        <PieChart width={170} height={170} className="pie">
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#000"
          >
            {`${humidityData.toFixed(0)}%`}
          </text>
        </PieChart>
      </div>
    </div>
  );
}

export default Humidity_chart;
