"use client";
import { SERVICES } from "../lib/services";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();
  return (
    <div className="bg-white w-full md:w-[880px] py-16 px-4 mx-auto">
      <div className="">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-[#1f0e2b] mb-4">
              Our Services
            </h2>
            <p className="text-[#1f0e2b] text-md">
              Getatradelinkltd makes it easy for you to find tradespeople for a
              rapidly growing range of home improvement jobs throughout the
              United Kingdom. You can request quotes for the following services.
            </p>
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => router.push("/post-a-job")}
              className=" w-[200px] text-[#2f76d9] border-b-2 border-b-[#2f76d9] py-2 mb-2 hover:cursor-pointer"
            >
              <p>{service.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
