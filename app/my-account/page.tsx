export default function MyAccount() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Contact details</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="email"
              type="email"
              placeholder="example@outlook.com"
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First name *
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last name (Optional)
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone number *
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              id="phone"
              type="text"
              placeholder="+44 7732386310"
            />
          </div>
        </div>
        <button
          className="mt-6 bg-[#2f76d9] hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Save
        </button>
        <div className="flex items-center mt-4 text-green-500">
          <p className="ml-2">Contact details saved! 🎉</p>
        </div>
      </form>
    </div>
  );
}
