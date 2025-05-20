type Props = {
  about?: string;
  phoneNumber?: string;
  email?: string;
};

export default function GeneralProfile({ about, phoneNumber, email }: Props) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">Brief description</h1>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-md font-semibold">About you</h2>
          <button className="text-sm font-semibold text-gray-800 flex items-center space-x-1 hover:underline">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828A2 2 0 0110.414 14H7v-3.414a2 2 0 01.586-1.414z" />
            </svg>
            <span>Edit</span>
          </button>
        </div>

        <p className="text-sm text-gray-700">{about}</p>
      </div>
      <div className="space-y-6 border border-gray-100">
        <div>
          <h2 className="text-md font-semibold text-gray-800 mb-2">
            Contact Information
          </h2>
          <div className="text-gray-700 space-y-1 text-sm">
            <p>
              <span className="font-medium">Email:</span> {email}
            </p>
            {phoneNumber && (
              <p>
                <span className="font-medium">Phone:</span> {phoneNumber}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
