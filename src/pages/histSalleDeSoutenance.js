import React, { useState, useEffect } from 'react';
import './histSalleDeSoutenance.css';
import NavBarre from '../components/navBarre.js';
import Tableau from '../components/tableau.js';

function HistSalleDeSoutenance(){
    return(
        <div>
             <header className = "titrehistorique" >Salle de soutenance - Historique des entrées collectées des paramteres"</header>
            <NavBarre/>
            {/* <Tableau/> */}
        </div>
    );
}

export default HistSalleDeSoutenance;
