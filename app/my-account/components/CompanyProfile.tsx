type Props = {
  about?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
};

export default function GeneralProfile({ about, phoneNumber, email, role }: Props) {
  const customer = role === "customer";
  return (
    <div>
      {customer &&
        <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">Company description</h1>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-md font-semibold">About the company</h2>
        </div>

        <p className="text-sm text-gray-700">{about}</p>
      </div>
      }
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
