import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(null)
  const [tokenContext,setTokenContext]=useState(null)
  const value = {
    userId,
    setUserId,
    tokenContext,
    setTokenContext
  }
  return (<DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>)
}
export default DataContext;