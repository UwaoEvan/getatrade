"use client";
import { useState } from "react";

export default function PortfolioGallery() {
  const [images, setImages] = useState([
    "/example1.jpg",
    "/example2.jpg",
    "/example3.jpg",
    // Add paths or URLs of uploaded images here
  ]);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileUrls]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Portfolio</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {images.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={img}
              alt={`Portfolio ${idx}`}
              className="w-full h-32 object-cover rounded shadow"
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full p-1 hover:bg-[#7198cf] hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <label
        htmlFor="upload"
        className="flex flex-col items-center justify-center w-full sm:w-64 h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-[#2f76d9] text-gray-500"
      >
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
        <span className="text-sm">Drag or select your files (PNG, JPG)</span>
        <input
          id="upload"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}
