"use client";
import Image from "next/image";
import Person from "@/public/signup-image.webp";
import ReliableWork from "./components/ReliableWork";
import FindWork from "./components/FindWork";
import { register } from "../lib/actions";
import { useActionState, useEffect } from "react";
import { Suspense } from "react";
import { SERVICES } from "../lib/services";
import { useRouter } from "next/navigation";

const initialState = { error: undefined, success: false, userId: 0 };

function SignupForm() {
  const [state, formAction] = useActionState(register, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/new-leads");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="p-8 flex flex-col justify-center text-black">
      <h1 className="text-3xl font-bold mb-6">
        The reliable way to get work you want
      </h1>
      <form
        action={formAction}
        className="bg-gray-300 text-black p-6 rounded-md space-y-4"
      >
        <select
          name="role"
          className="w-full bg-white text-sm border border-gray-300 rounded px-3 py-2 outline-0"
        >
          <option value="">Your main trade</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.label}>
              {service.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="username"
          placeholder="Your company name"
          className="w-full border text-sm bg-white border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email to receive leads"
          className="w-full bg-white border text-sm border-gray-300 p-2 rounded"
        />
        <div className="space-y-1">
          <input
            type="tel"
            name="phonenumber"
            placeholder="UK phone number"
            className={`w-full bg-white border p-2 text-sm rounded "border-gray-300"`}
            pattern="^(\+44|0044|44|0)[1-9]\d{8,9}$"
            title="Please enter a valid UK phone number"
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          pattern=".{6,}"
          title="Password must be at least 6 characters long"
          className="w-full bg-white border border-gray-300 p-2 rounded"
        />
        <div className="mb-4 flex items-start">
          <input type="checkbox" name="terms" className="mr-2 mt-1" />
          <label className="text-sm text-gray-500">
            Would you like to receive marketing communications about
            Getatradelink services by email, SMS and that you can unsubscribe at
            any time?
          </label>
        </div>
        <p className="text-xs text-gray-500">
          By clicking Sign up for free, you agree to Getatradelinkltd Terms and
          Conditions. For information on how we process your data, see our
          Privacy policy.
        </p>
        <button
          type="submit"
          className="w-full bg-[#2f76d9] text-white py-2 rounded hover:bg-purple-800"
        >
          Sign up for free
        </button>
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </form>
    </div>
  );
}

export default function TradeWorkSignup() {
  return (
    <div className="bg-white">
      <div className="w-full md:w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2">
        <Suspense
          fallback={
            <div className="p-8 flex flex-col justify-center text-black">
              <div className="animate-pulse bg-gray-200 h-8 w-3/4 mb-6 rounded"></div>
              <div className="bg-gray-300 p-6 rounded-md space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          }
        >
          <SignupForm />
        </Suspense>

        <div className="hidden md:block relative h-[500px] mt-[20%]">
          <Image
            src={Person}
            alt="Worker"
            fill
            className="object-cover h-[200px]"
            priority
          />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="min-h-[200px] bg-gray-100 animate-pulse"></div>
        }
      >
        <FindWork />
      </Suspense>

      <Suspense
        fallback={
          <div className="min-h-[200px] bg-gray-100 animate-pulse"></div>
        }
      >
        <ReliableWork />
      </Suspense>
    </div>
  );
}
