import React, { useState, useEffect } from 'react';
import './dashboardSalleDevWeb.css';
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

function DashboardSalleDevWeb(){
    return(
        <div>
            <NavBarre/>
            {/* <header className = "header2">Aperçu - Salle Dev Web Mobile + IoT</header>
            <Co2_card/>
            <Voc_card/>
            <Humidity_card/>
            <Temperature_card/>
            <Co2_chart/>
            <Voc_chart/>
            <Temperature_chart/>
            <Humidity_chart/>
            <Bar_chart/>
            <Chats_card/> */}
        </div>
    );
}

export default DashboardSalleDevWeb;
