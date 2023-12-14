import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './co2_chart.css';

function Co2_chart({ co2 }) {
  const [co2Data, setCo2Data] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      const newCo2Data = { time: currentTime, co2 };

      if (co2Data.length >= 10) {
        setCo2Data((prevData) => prevData.slice(1));
      }

      setCo2Data((prevData) => [...prevData, newCo2Data]);
    }, 3000);

    return () => clearInterval(interval);
  }, [co2, co2Data]);

  return (
    <div>
      <div className="co2_chart">
        <h1 className="co2_title">Concentration de CO2 (ppm)</h1>
        <AreaChart width={345} height={220} data={co2Data} margin={{ right: 5, top: 10 }}>
          <XAxis dataKey="time" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} domain={[0, 6000]} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="co2"
            fill="rgb(173, 255, 47, 1)"
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default Co2_chart;
