import Image from "next/image";

export default function CustomerProfile() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-6">
        <Image
          src="/user-placeholder.png" // Replace with actual user image
          alt="User Profile"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-2xl font-bold text-gray-800">Jane Doe</h1>
          <p className="text-gray-600">Customer since Jan 2022</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 space-y-6 border border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Contact Information
          </h2>
          <div className="text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Email:</span> jane.doe@example.com
            </p>
            <p>
              <span className="font-medium">Phone:</span> +44 1234 567890
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Address</h2>
          <div className="text-gray-700 space-y-1">
            <p>123 Main Street</p>
            <p>Maidstone, Kent</p>
            <p>ME15 6XX</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Preferences
          </h2>
          <p className="text-gray-700">
            Subscribed to newsletter:{" "}
            <span className="font-medium text-green-600">Yes</span>
          </p>
        </div>
      </div>
    </div>
  );
}
