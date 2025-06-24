"use client";

import type React from "react";

import { Edit } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type ProfileProps = {
  userId?: number;
  imageUri?: string;
};

export default function ProfileImage({ userId, imageUri }: ProfileProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function uploadImage(file: File) {
    if (!userId) {
      setError("User ID is required");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId.toString());

      const response = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (data.success && data.images?.profileUrl) {
        setImagePreview(data.images.profileUrl);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Clear success message after 3 seconds
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed");
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    } finally {
      setIsUploading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload the image
      uploadImage(file);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mb-2 relative">
        {imagePreview ? (
          <img
            src={imagePreview || "/placeholder.svg"}
            alt="Profile preview"
            className="w-[100px] h-[100px] rounded-full object-contain"
          />
        ) : imageUri ? (
          <Image
            src={imageUri}
            alt="image"
            className="w-[100px] h-[100px] rounded-full object-contain"
            width={80}
            height={80}
          />
        ) : (
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xs">No Image</span>
          </div>
        )}

        <label
          className={`absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border ${
            isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading}
          />
          <Edit size={10} className={isUploading ? "animate-pulse" : ""} />
        </label>

        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {error && (
        <div className="text-red-500 text-xs mt-1 text-center max-w-[200px]">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-500 text-xs mt-1 text-center">
          Profile image updated successfully!
        </div>
      )}

      {isUploading && (
        <div className="text-blue-500 text-xs mt-1 text-center">
          Uploading...
        </div>
      )}
    </div>
  );
}
