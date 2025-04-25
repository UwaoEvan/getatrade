'use client'
import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const router = useRouter();

  // if (session) {
  //   return router.push("/dashboard");
  // }


  return (
    <div className="flex items-center justify-center mt-10 px-4">
      <div className="bg-white shadow border border-gray-200 rounded-lg p-8 max-w-md w-full space-y-6">
        <div>
          <h1 className="sm:text-xl md:text-2xl font-semibold text-gray-900">Login to GetATradeLinkLtd</h1>
          <p className="text-gray-600 mt-1">Enter your email to continue</p>
        </div>
        <form className="space-y-5" action={formAction}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
            className="w-full bg-[#2f76d9] hover:cursor-pointer text-white py-2 rounded-md font-medium transition"
          >
            <Suspense fallback={<p>Loading...</p>}>
              Log in
            </Suspense>
          </button>
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </form>

        <hr className="border-gray-200" />
        <div className="text-sm text-gray-800">
          <p className="font-semibold">New to Getatradelinkltd?</p>
          <p className="mt-1">
            <Link href="/post-a-job" className="text-[#2f76d9] underline">Post your job
            </Link>{" "}
            to find a tradesperson
          </p>
          <p>
            <Link href="/tradesworks-signup" className="text-[#2f76d9] underline">Sign up
            </Link>{" "}
            to join as a tradesperson
          </p>
        </div>
      </div>
    </div>
  );
}
