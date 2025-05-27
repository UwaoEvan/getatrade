import Link from "next/link";

export default function CustomerSignup() {
  return (
    <div className="w-full max-w-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign up to continue</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Full Name</label>
        <input
          type="text"
          name="username"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Full name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Phone Number</label>
        <input
          type="tel"
          name="phonenumber"
          placeholder="UK phone number"
          className={`w-full bg-white border p-2 text-sm rounded "border-gray-300"`}
          pattern="^(\+44|0044|44|0)[1-9]\d{8,9}$"
          title="Please enter a valid UK phone number"
        />
        <p className="text-sm text-gray-500 mt-1">
          Your phone number will be shared with the tradesperson you choose to
          talk to.
        </p>
      </div>

      <input type="hidden" name="role" value="customer" />

      <div className="mb-4">
        <label className="block font-semibold mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          pattern=".{6,}"
          title="Password must be at least 6 characters long"
          className="w-full bg-white border border-gray-300 p-2 rounded"
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
    </div>
  );
}
