// AppContext.js
import React, { createContext, useState } from 'react';

// Create a Context
export const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  // Define your global state
  const [user, setUser] = useState(null); // Example state: user
  const [theme, setTheme] = useState('light'); // Example state: theme
  const [bfOrders,setBfOrders]=useState([]);
  const [lnOrders,setLnOrders]=useState([]);
  const [dnOrders,setDnOrders]=useState([]);

  // The value passed to the provider will be accessible to all components
  return (
    <AppContext.Provider value={{ bfOrders,setBfOrders,lnOrders,setLnOrders,dnOrders,setDnOrders }}>
      {children}
    </AppContext.Provider>
  );
};
