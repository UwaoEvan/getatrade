"use client";
import { useState } from "react";
import Image from "next/image";
import info from "@/public/menuicons/info.png";
import GuaranteeSelector from "./GuaranteeSelector";
import { editProfile } from "../action";
import { Button } from "@/components/ui/button";

type Props = {
  about?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  userId?: number;
};

export default function GeneralProfile({ about = "", userId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(about);

  const handleSave = async () => {
    if (userId) {
      await editProfile(userId, aboutText);
    }
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">Company description</h1>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-md font-semibold">About your company</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 text-sm underline"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md text-md text-gray-700"
              rows={4}
              name="about"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
            />
            <Button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </Button>
          </form>
        ) : (
          <p className="text-md text-gray-700 whitespace-pre-wrap">
            {aboutText || "No description provided."}
          </p>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-md font-semibold">Guarantee</h2>
      </div>
      <p className="text-md text-gray-700">
        Increase your chances of getting hired by offering a guarantee.
      </p>
      <div className="flex items-center my-4">
        <Image src={info} alt="info" className="w-4 h-4 object-contain mr-2" />
        <p className="text-sm text-gray-700">
          Homeowners are aware guarantees vary and should discuss the terms in
          advance.
        </p>
      </div>
      <GuaranteeSelector />
    </div>
  );
}
