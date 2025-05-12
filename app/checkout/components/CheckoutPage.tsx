"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function CheckoutPage({ amount = 10 }: { amount: number }) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message as string);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message as string);
    } else {
      // customer is shown the sucess animation.
      setPaymentSuccess(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to load payment intent.");
        console.log(error)
      }
    };

    createPaymentIntent();
  }, [amount]);

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center min-h-[20vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] animate-fade-in">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-md text-center transform transition duration-500 scale-100">
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-sm">Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        aria-disabled={!stripe || !loading}
        className="w-full bg-[#2f76d9] hover:cursor-pointer text-white py-2 rounded-md font-medium transition relative"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
            Processing...
          </span>
        ) : (
          `Pay ${amount}`
        )}
      </button>
    </form>
  );
}
