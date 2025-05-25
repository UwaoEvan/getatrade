import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import React from "react";

const ContactDetails = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>

      {user?.role === "customer" ? (
        <>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-md text-gray-700 font-medium">{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-md text-gray-700 font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-md text-gray-700 font-medium">
              {user?.phoneNumber}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-sm text-gray-500">Trading name</p>
            <p className="text-md text-gray-700 font-medium">
              {user?.username}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-md text-gray-700 font-medium">
              {user?.firstName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-md text-gray-700 font-medium">
              {user?.location}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactDetails;
