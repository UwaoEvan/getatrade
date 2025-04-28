"use client";
import React from "react";
import { useActionState } from "react";
import { postJob } from "../lib/actions";
import { Suspense } from "react";
import { SERVICES } from "../lib/services";
import Image from "next/image";
import thumbsUp from "@/public/thumbsUp.svg";
import userGroup from "@/public/userGroup.svg";
import postIcon from "@/public/post-icon.svg";

const initialState = { error: undefined, success: false };
export default function PostAJob() {
  const [state, formAction, isPending] = useActionState(postJob, initialState);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="w-full px-4 lg:w-[800px] mx-auto py-4">
        <h1 className="text-3xl font-bold mb-4">Post a job</h1>
        <p className="mb-6 text-gray-600">
          Get responses from Getatradelinkltd&apos;s screened and reviewed
          tradespeople near you
        </p>
        <form action={formAction}>
          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What would you like to have done?
            </label>
            <select
              name="title"
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select a service</option>
              {SERVICES.map((service) => (
                <option key={service.id} value={service.label}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What type of service do you need?
            </label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Basic outline plans, Full regulation plans..."
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What type of project are you planning?
            </label>
            <input
              type="text"
              name="project"
              placeholder="e.g., Extension, Renovation, New build..."
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">
              Describe what you need the plans for
            </label>
            <textarea
              name="description"
              placeholder="E.g. I need plans for something a little bit different..."
              className="w-full border border-[#2f76d9] rounded px-3 py-2 h-28"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What is your location?
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Maidstone"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-1">
              What is your contact email?
            </label>
            <input
              type="email"
              name="contactEmail"
              placeholder="e.g., user@info.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-between">
            <button className="bg-[#2f76d9] text-white px-4 py-2 rounded">
              {isPending ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Posting...
                </span>
              ) : (
                "Post job"
              )}
            </button>
          </div>
          {state?.error && <p className="text-red-500">{state.error}</p>}
          {state?.success && (
            <p className="text-green-600">
              Job posting created successfully! 🎉
            </p>
          )}
        </form>
        <InfoCards />
      </div>
    </Suspense>
  );
}

function InfoCards() {
  const cards = [
    {
      icon: postIcon,
      title: "Post your job for free – no strings attached",
    },
    {
      icon: userGroup,
      title: "More than 240,079 qualified tradespeople",
    },
    {
      icon: thumbsUp,
      title: "More than 2,559,546 independent reviews",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col p-6 border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
        >
          <Image
            src={card.icon}
            alt="icon"
            className="bg-gray-100 w-16 h-16 rounded-full mb-4"
          />
          <p className="text-gray-800 font-bold">{card.title}</p>
        </div>
      ))}
    </div>
  );
}
