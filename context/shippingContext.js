// ShippingContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    const storedShippingInfo = localStorage.getItem("shippingInfo");
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    }
  }, []);

  useEffect(() => {
    if (shippingInfo) {
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    }
  }, [shippingInfo]);

  return (
    <ShippingContext.Provider value={{ shippingInfo, setShippingInfo }}>
      {children}
    </ShippingContext.Provider>
  );
};

export function useShipping() {
  return useContext(ShippingContext); // Exporta como función regular
}

export default ShippingContext;
