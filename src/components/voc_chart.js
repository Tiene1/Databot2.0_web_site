import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './voc_chart.css';

function Voc_chart({ voc }) {
  const [vocData, setVocData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      const newVocData = { time: currentTime, voc };

      if (vocData.length >= 10) {
        setVocData((prevData) => prevData.slice(1));
      }

      setVocData((prevData) => [...prevData, newVocData]);
    }, 3000);

    return () => clearInterval(interval);
  }, [voc, vocData]);

  return (
    <div>
      <div className="voc_chart">
        <h1 className="voc_title">Concentration de COV (ppb)</h1>
        <AreaChart width={345} height={220} data={vocData} margin={{ right: 5, top: 10 }}>
          <XAxis dataKey="time" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} domain={[0, 3000]} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="voc"
            fill="rgb(173, 255, 47, 0.5)"
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default Voc_chart;
