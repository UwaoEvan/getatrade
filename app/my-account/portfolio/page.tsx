"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PortfolioImage {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
}

export default function Page() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/upload");
      const data = await response.json();

      if (response.ok) {
        setImages(data.images);
      } else {
      }
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    try {
      const response = await fetch(`/api/upload/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setImages(images.filter((img) => img.id !== id));
      } else {
      }
    } catch {}
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImages((prev) => [...data.images, ...prev]);

        e.target.value = "";
      } else {
      }
    } catch {
      setIsLoading(false);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto md:p-4">
      <h2 className="text-lg md:text-3xl font-bold mb-6">Portfolio</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.url || "/placeholder.svg"}
              alt={img.filename}
              className="w-full h-32 object-cover rounded shadow"
            />
            <Button
              onClick={() => removeImage(img.id)}
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        ))}
      </div>

      <label
        htmlFor="upload"
        className={`flex flex-col items-center justify-center w-full sm:w-64 h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-[#2f76d9] text-gray-500 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            <span className="text-sm">Uploading...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 014-4h10a4 4 0 014 4v4H3v-4zM7 10V7a5 5 0 0110 0v3"
              />
            </svg>
            <span className="text-sm">
              Drag or select your files (PNG, JPG)
            </span>
          </>
        )}
        <input
          id="upload"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="hidden"
          onChange={handleUpload}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
