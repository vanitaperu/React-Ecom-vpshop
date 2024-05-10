import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = () => setPaidFor(true);

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        onClick={(data, actions) => {
          if (false) {
            setError("You Already Bought this Product");
            actions.reject();
          } else actions.resolve();
        }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              { id: product.id, amount: { value: product.price } },
            ],
          })
        }
        onApprove={async (data, action) => {
          handleApprove();
          console.log(await action.order.capture());
        }}
        onError={(err) => setError(err)}
      />
      {paidFor && alert("Thank For purchasing from vp-shop")}
      {error && alert(error)}
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
