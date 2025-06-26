"use client";

import Location from "@/app/components/Location";
import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import React, { Suspense, useActionState, useEffect, useState } from "react";
import { updateContactDetails } from "./action";

const initState = { error: undefined, success: false };
const ContactDetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(
    updateContactDetails,
    initState,
  );

  useEffect(() => {
    const fetchData = async () => {
      const session = await auth();
      const userData = await getUser(session?.user?.email as string);
      setUser(userData);
    };
    setIsEditing(false);
    fetchData();
  }, [state]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="max-w-md mx-auto md:p-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Contact Details
        </h2>

        {!isEditing ? (
          <>
            {user?.role === "customer" ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-md text-gray-700 font-medium">
                    {user.username}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-md text-gray-700 font-medium">
                    {user.email}
                  </p>
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
                    {user?.address}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-md text-gray-700 font-medium">
                    {user?.location}
                  </p>
                </div>
              </>
            )}

            <button
              onClick={handleEditToggle}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          </>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name *
              </label>
              <input
                type="text"
                defaultValue={user?.firstName}
                name="firstName"
                className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-[#2f76d9] focus:border-[#2f76d9] sm:text-sm p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name *
              </label>
              <input
                type="text"
                defaultValue={user?.lastName}
                name="lastName"
                className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-[#2f76d9] focus:border-[#2f76d9] sm:text-sm p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number *
              </label>
              <div className="space-y-1">
                <div className="flex rounded-sm border border-gray-300 shadow-sm focus-within:ring-1 focus-within:ring-gray-300 focus-within:border-gray-300">
                  <span className="flex items-center px-3 bg-gray-100 text-gray-700 border-r border-gray-300 text-sm">
                    +44
                  </span>
                  <input
                    type="tel"
                    defaultValue={user?.phoneNumber}
                    name="phonenumber"
                    placeholder="UK phone number"
                    className="flex-1 p-3 rounded-sm focus:outline-none sm:text-sm"
                    title="Please enter a valid UK phone number"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <input
                type="text"
                name="address"
                defaultValue={user?.address}
                className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-[#2f76d9] focus:border-[#2f76d9] sm:text-sm p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <div>
                <Location
                  value={location || user?.location}
                  onChange={setLocation}
                  placeholder="Start typing your location..."
                  className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-[#2f76d9] focus:border-[#2f76d9] sm:text-sm p-3"
                />
              </div>
              <input
                type="hidden"
                name="location"
                value={location || user?.location}
              />
              <input type="hidden" name="userId" value={user?.id} />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-purple-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Suspense>
  );
};

export default ContactDetails;
