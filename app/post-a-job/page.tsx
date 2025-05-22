"use client";
import React, { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import thumbsUp from "@/public/thumbsUp.svg";
import userGroup from "@/public/userGroup.svg";
import postIcon from "@/public/post-icon.svg";
import PostJob from "./components/PostJob";
import CustomerSignup from "./components/CustomerSignUp";
import { postJob } from "./actions";

const initialState = { error: undefined, success: false };
export default function PostAJob() {
  const [form, setForm] = useState<"PostJob" | "SignUp">("PostJob");
  const [state, formAction, isPending] = useActionState(postJob, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      router.push("/my-jobs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const validatePostJobForm = () => {
    const formData = new FormData(formRef.current!);
    const requiredFields = [
      "title",
      "category",
      "project",
      "description",
      "location",
    ];
    return requiredFields.every((field) =>
      formData.get(field)?.toString().trim(),
    );
  };

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
        <form ref={formRef} action={formAction}>
          <div className={form === "PostJob" ? "block" : "hidden"}>
            <PostJob />
          </div>
          <div className={form === "SignUp" ? "block" : "hidden"}>
            <CustomerSignup />
          </div>
          <div className="flex justify-between">
            <button
              type={form === "PostJob" ? "button" : "submit"}
              onClick={(e) => {
                if (form === "PostJob") {
                  e.preventDefault();
                  if (!validatePostJobForm()) {
                    alert("Please fill in all required fields.");
                    return;
                  }
                  setForm("SignUp");
                }
              }}
              className="bg-[#2f76d9] text-white px-4 py-2 rounded"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Posting...
                </span>
              ) : form === "PostJob" ? (
                "Next"
              ) : (
                "Finalize"
              )}
            </button>
          </div>
          {state?.error && <p className="text-red-500">{state.error}</p>}
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
