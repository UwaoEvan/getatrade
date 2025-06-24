"use client";
import { useActionState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { resetPassword } from "./action";

const initialState = { error: undefined, success: false };
export default function ForgotPassword() {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );

  return (
    <div className="flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow border border-gray-200 rounded-lg p-4 max-w-md w-full space-y-6">
        <div>
          <Image src={logo} alt="logo" className="w-40 mx-auto py-4 md:py-6" />
        </div>

        <form className="space-y-5" action={formAction}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>
          <button
            aria-disabled={isPending}
            type="submit"
            className="w-full bg-[#2f76d9] hover:cursor-pointer text-white py-2 rounded-md font-medium transition relative"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Validating...
              </span>
            ) : (
              "Confirm"
            )}
          </button>

          {state?.error && (
            <p className="text-sm text-red-500 text-center">{state.error}</p>
          )}
          {state?.success && (
            <div className="text-green-500 text-xs mt-1 text-center">
              Check your email inbox for instructions
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
