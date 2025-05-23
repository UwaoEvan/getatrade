import React from "react";

const ContactDetails = () => {
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>

      <div>
        <p className="text-sm text-gray-500">Trading name</p>
        <p className="text-md text-gray-700 font-medium">
          McKenzie Plastering & Decorating Service
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p className="text-md text-gray-700 font-medium">Sharna McKenzie</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Address</p>
        <p className="text-md text-gray-700 font-medium">
          Bower Lane
          <br />
          ME16 8BJ Maidstone
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;
