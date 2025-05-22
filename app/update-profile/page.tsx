"use client";
import { useActionState, useEffect } from "react";
import { updateProfile } from "./action";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initState = { success: false, error: undefined };
export default function UpdateProfile() {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/my-account");
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-xl mx-auto p-6 space-y-6 h-screen"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          required
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          placeholder="Enter your firstname"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Last name
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          required
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          placeholder="Enter your lastname"
        />
      </div>

      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          Company description
        </label>
        <textarea
          id="about"
          name="about"
          required
          rows={4}
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          placeholder="Tell us a bit about your company..."
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-[#2f76d9] focus:border-[#2f76d9] sm:text-sm p-3"
          placeholder="Enter your location"
        />
      </div>

      <div className="mb-4 flex items-start">
        <input type="checkbox" name="terms" className="mr-2 mt-1" required />
        <label className="text-sm">
          I agree to the{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Terms and Conditions
          </Link>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#2f76d9] text-white py-2 px-4 rounded-sm hover:cursor-pointer transition"
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
            Updating...
          </span>
        ) : (
          "Save changes"
        )}
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
