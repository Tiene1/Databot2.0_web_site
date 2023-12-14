import React, { useEffect, useState } from 'react';
import './navBarre.css';
import DatabotLogo from '../images/databotLogo.png';
import iconedashboard from '../images/iconeDashboard.png';
import arrowRight from '../images/arrowRight.png';
import arrowDown from '../images/arrowDown.png';
import historicalIcon from '../images/historicalIcon.png';
import databot from '../images/databot.png';
import { Link, useLocation } from "react-router-dom";
import { useNavBar } from '../NavBarContext';

function NavBarre() {
  // États pour gérer la visibilité des menus déroulants et les sélections de sous-menu
  const {
    isTableauDeBordVisible,
    setIsTableauDeBordVisible,
    isHistoriquesVisible,
    setIsHistoriquesVisible,
  } = useNavBar();

  const location = useLocation();
  
  const [sousMenuTableauDeBordSelectionne, setSousMenuTableauDeBordSelectionne] = useState(null);

  // Fonction pour basculer la visibilité du menu Tableaux de bord
  const toggleTableauDeBordMenu = () => {
    setIsTableauDeBordVisible(!isTableauDeBordVisible);
  };

  // Fonction pour basculer la visibilité du menu Historiques des données
  const toggleHistoriquesMenu = () => {
    setIsHistoriquesVisible(!isHistoriquesVisible);
  };

  // Fonction pour sélectionner un sous-menu du menu Tableaux de bord
  const selectSousMenuTableauDeBord = (lien) => {
    setSousMenuTableauDeBordSelectionne(lien);
  };

  // Mettre à jour la sélection en fonction de l'URL actuelle
  useEffect(() => {
    if (location.pathname === '/') {
      setSousMenuTableauDeBordSelectionne('1');
    } else if (location.pathname === '/dashboardSalleDevWeb') {
      setSousMenuTableauDeBordSelectionne('2');
    }
    else if (location.pathname === '/histSalleDeSoutenance') {
    setSousMenuTableauDeBordSelectionne('3');
  }
  }, [location]);

  return (
    <div>
      <nav className="fenetreDesMenus">
        <header>
          <img src={DatabotLogo} alt="databotLogo" className="databotLogo" />
        </header>
        <dt className="dtEspaces">
          <li>
            {/* Lien pour le menu Tableaux de bord */}
            <a
              href="#"
              id="linkTableauDeBord"
              className={`linkSPace`}
              onClick={(e) => { e.preventDefault(); toggleTableauDeBordMenu(); }}>
              <img src={iconedashboard} alt="Home icon" className="iconedashboard" />
              Tableaux de bord
              <img src={isTableauDeBordVisible ? arrowDown : arrowRight} alt="arrow icon" className="arrowIcon" />
            </a>
            {isTableauDeBordVisible && (
              // Sous-menu pour le menu Tableaux de bord
              <ul className="ulMenu">
                <li className="st">
                  {/* Lien pour le sous-menu "Salle de soutenance" */}
                    <Link 
                      to="/"
                      className={`stLink ${sousMenuTableauDeBordSelectionne === '1' ? 'selected' : ''}`}
                      onClick={() => selectSousMenuTableauDeBord('1')}
                      >Salle de soutenance</Link>
                </li>
                {/* <li className="dev">
                  Lien pour le sous-menu "Salle Dev Web Mobile + IoT"
                    <Link 
                      to="/dashboardSalleDevWeb"
                      href="/dashboardSalleDevWeb"
                      className={`devLink ${sousMenuTableauDeBordSelectionne === '2' ? 'selected' : ''}`}
                      onClick={() => selectSousMenuTableauDeBord('2')}
                      >Salle Dev Web Mobile + IoT</Link>
                </li> */}
              </ul>
            )}
          </li>
        </dt>
        <div className="line"></div>
        <dt className="dthistorical">
          <li>
            {/* Lien pour le menu Historiques des données */}
            <a
              href="#"
              id="linkHistoriques"
              className={`linkSPace`}
              onClick={(e) => { e.preventDefault(); toggleHistoriquesMenu(); }}>
              <img src={historicalIcon} alt="historical icon" className="historicalIcon" />
              Historiques des données
              <img src={isHistoriquesVisible ? arrowDown : arrowRight} alt="arrow icon" className="arrowIcon" />
            </a>
            {isHistoriquesVisible && (
              // Sous-menu pour le menu Historiques des données
              <ul className="ulMenu">
                <li className="st">
                  {/* Lien pour le sous-menu "Salle de soutenance" */}
                  <Link 
                    to="/histSalleDeSoutenance"
                    className={`stLink ${sousMenuTableauDeBordSelectionne === '3' ? 'selected' : ''}`}
                    onClick={() => selectSousMenuTableauDeBord('3')}>
                    Salle de soutenance
                  </Link>
                </li>
                {/* <li className="dev">
                  Lien pour le sous-menu "Salle Dev Web Mobile + IoT"
                  <a
                    href="#"
                    className={`devLink ${sousMenuTableauDeBordSelectionne === '4' ? 'selected' : ''}`}
                    onClick={() => selectSousMenuTableauDeBord('4')}>
                    Salle Dev Web Mobile + IoT
                  </a>
                </li> */}
              </ul>
            )}
          </li>
        </dt>
        <img src={databot} alt="image databot" className="databot" />
      </nav>
    </div>
  );
}

export default NavBarre;
