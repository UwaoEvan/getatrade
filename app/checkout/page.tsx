"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./components/CheckoutPage";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_KEY as string);

export default function Checkout() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const amount = 39;

  return (
    <div className="min-h-screen mx-auto bg-gray-100 py-6">
      <div className="w-full px-4 md:w-[880px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Complete the payment.</h1>
        </div>
        <p>Since you have been shortlisted, a payment of 100 is needed</p>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: amount,
            currency: "gbp",
          }}
        >
          <CheckoutPage
            amount={amount}
            description={`Payment for job: ${jobId || "Unknown"}`}
            jobId={jobId || ""}
          />
        </Elements>
      </div>
    </div>
  );
}
