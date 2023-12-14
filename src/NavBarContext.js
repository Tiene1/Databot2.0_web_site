import React, { createContext, useContext, useState } from 'react';

const NavBarContext = createContext();

export function useNavBar() {
  return useContext(NavBarContext);
}

export function NavBarProvider({ children }) {
  const [isTableauDeBordVisible, setIsTableauDeBordVisible] = useState(false);
  const [isHistoriquesVisible, setIsHistoriquesVisible] = useState(false);

  const value = {
    isTableauDeBordVisible,
    setIsTableauDeBordVisible,
    isHistoriquesVisible,
    setIsHistoriquesVisible,
  };

  return (
    <NavBarContext.Provider value={value}>
      {children}
    </NavBarContext.Provider>
  );
}
