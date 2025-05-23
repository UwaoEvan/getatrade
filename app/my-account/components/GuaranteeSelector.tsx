"use client";
import { useState } from "react";

export default function GuaranteeSelector() {
  const [selected, setSelected] = useState("no");

  const options = [
    { label: "Yes, I offer a guarantee", value: "yes" },
    { label: "No, I do not offer a guarantee", value: "no" },
  ];

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isActive = selected === option.value;
        return (
          <label
            key={option.value}
            className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all
              ${
                isActive
                  ? "bg-gray-100 border-black"
                  : "bg-white border-gray-300"
              }`}
          >
            <span className="text-sm font-medium">{option.label}</span>
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                isActive ? "border-black" : "border-gray-300"
              }`}
            >
              {isActive && (
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
              )}
            </span>
            <input
              type="radio"
              name="guarantee"
              value={option.value}
              checked={isActive}
              onChange={() => setSelected(option.value)}
              className="sr-only"
            />
          </label>
        );
      })}
    </div>
  );
}
