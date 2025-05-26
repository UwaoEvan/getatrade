"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface PortfolioImage {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
}

export default function Portfolio({ userId }: { userId?: number}) {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/portfolio/${userId}`);
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
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Portfolio</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.url || "/placeholder.svg"}
              alt={img.filename}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
