import Image from "next/image";
import logo from "@/public/logo.png";

export default function NavigationHeader() {
  return (
    <div className="bg-[#2f76d9] text-white flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <div className="p-1 rounded-full">
          <Image src={logo} alt="logo" className="h-[60px] object-contain"/>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-white hover:underline">Post a job</button>
        <button className="text-white hover:underline">Log in</button>
        <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-[#1f0e2b] transition">
          Sign up as a tradesperson
        </button>
      </div>
    </div>
  );
}