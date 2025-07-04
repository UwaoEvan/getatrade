"use client";
import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/new-leads";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          <button
            aria-disabled={isPending}
            type="submit"
            className="w-full bg-[#2f76d9] hover:cursor-pointer text-white py-2 rounded-md font-medium transition relative"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Logging in...
              </span>
            ) : (
              "Log in"
            )}
          </button>

          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}
        </form>

        <hr className="border-gray-200" />

        <div className="text-sm text-gray-800">
          <p className="font-semibold">New to Getatradelinkltd?</p>
          <p className="mt-1">
            <Link
              href="/post-a-job"
              className="text-[#2f76d9] font-bold hover:underline"
            >
              Post your job
            </Link>{" "}
            to find a tradesperson
          </p>
          <p>
            <Link
              href="/tradesworks-signup"
              className="text-[#2f76d9] font-bold hover:underline"
            >
              Sign up
            </Link>{" "}
            to join as a tradesperson
          </p>
          <p>
            <Link
              href="/forgot-password"
              className="text-[#2f76d9] font-bold hover:underline"
            >
              Forgot password
            </Link>{" "}
            to reset password
          </p>
        </div>
      </div>
    </div>
  );
}
