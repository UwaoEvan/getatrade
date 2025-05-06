export default function CustomerSignup() {
  return (
    <div className="w-full max-w-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign up to continue</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Username</label>
        <input
          type="text"
          name="username"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="username"
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
      <input type="hidden" name="role" value="customer" />
      <div className="mb-4">
        <label className="block font-semibold mb-1">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="••••••••"
        />
      </div>
    </div>
  );
}
