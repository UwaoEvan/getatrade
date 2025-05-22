"use client";
import Image from "next/image";
import Painter from "@/public/Screenshot 2025-04-23 at 16.12.05.png";
import { useRouter } from "next/navigation";
import { SERVICES } from "@/app/lib/services";

export default function HomeBanner() {
  const router = useRouter();
  return (
    <div className="bg-[#2f76d9] w-full ">
      <div className="mx-4 lg:w-[880px] lg:mx-auto flex flex-col md:flex-row md:items-center md:justify-center py-12 text-white">
        <div className="md:w-1/2 space-y-6 text-left">
          <h1 className="text-2xl lg:text-5xl md:text-3xl font-bold leading-tight">
            The reliable way <br />
            <span className="text-cyan-300">to hire</span> a tradesperson
          </h1>

          <div className="mt-10 md:mt-20">
            <label
              htmlFor="jobSearch"
              className="text-xl md:text-3xl font-bold leading-tight"
            >
              What is your job?
            </label>
            <div className="flex max-w-md md:mx-0 mt-6">
              <select
                name="title"
                className="w-full border border-gray-300 rounded px-3 py-2 appearance-none bg-transparent, text-gray-400 outline-0"
                style={{ backgroundImage: "none", backgroundColor: "white" }}
              >
                <option value="">For example: painting</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.label}>
                    {service.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => router.push("/post-a-job")}
                className="bg-[#0c51a1] px-5 flex items-center justify-center rounded-r"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 w-4/5 self-center md:mt-0 md:w-1/2 relative flex justify-center items-center">
          <Image src={Painter} alt="painter" className="h-fit object-contain" />
        </div>
      </div>
    </div>
  );
}
