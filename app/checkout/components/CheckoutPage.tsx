"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { savePayments } from "@/app/lib/actions";

export default function CheckoutPage({
  amount = 10,
  description,
}: {
  amount: number;
  description: string;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

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

    await savePayments(amount, description);
    
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message as string);
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
        console.log(error);
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
