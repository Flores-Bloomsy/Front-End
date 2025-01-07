// providers/PayPalProvider.js
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  intent: "capture",
  currency: "USD",
};

export const PayPalProvider = ({ children }) => {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      {children}
    </PayPalScriptProvider>
  );
};
