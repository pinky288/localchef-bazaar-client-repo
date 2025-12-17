import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const transactionId = searchParams.get("transactionId");

    if (!orderId) return;

    const updatePayment = async () => {
      try {
        await fetch(`http://localhost:3000/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentStatus: "Paid" }),
        });

    await fetch("http://localhost:3000/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, amount, transactionId }),
          }); 
        setTimeout(() => navigate("/dashboard/orders"), 2000);

      } catch (err) {
        console.error(err);
        alert("Payment update failed. Please contact support.");
      }
    };
    updatePayment();
  }, [navigate, searchParams]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Payment Successful</h2>
    <p className="mt-2">
          Processing Payment...<br />
          Please wait, we are updating your order status.
      </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
