import Image from "next/image";
import Step1 from "@/public/job-finding-step-1.svg";
import Step2 from "@/public/job-finding-step-2.svg";
import Step3 from "@/public/job-finding-step-3.svg";
import Link from 'next/link';

export default function FindWork() {
  return (
    <div className="bg-gray-100 text-center py-12 px-4">
        <h2 className="text-2xl font-semibold mb-10">How to find the work you want</h2>
        <div className="w-full px-4 md:w-[880px] md:mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image src={Step1} alt="Step 1" width={80} height={80} />
            </div>
            <h3 className="font-bold">STEP 1</h3>
            <p className="font-medium">Receive tailored leads</p>
            <p>Set up your free professional profile and we’ll send you leads that match your skills and work area.</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image src={Step2} alt="Step 2" width={80} height={80} />
            </div>
            <h3 className="font-bold">STEP 2</h3>
            <p className="font-medium">Express interest</p>
            <p>Respond to as many leads as you like. Based on your profile, work history and reviews, customers decide who to share their details with.</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image src={Step3} alt="Step 3" width={80} height={80} />
            </div>
            <h3 className="font-bold">STEP 3</h3>
            <p className="font-medium">Connect and arrange</p>
            <p>If you’re shortlisted, we charge you a fee for the customer’s contact details so you can get in touch to exchange more details about the job.</p>
          </div>
        </div>
        <div className="mt-8">
          <Link href={"/tradesworks-signup"} className="bg-[#2f76d9] text-white px-6 py-3 rounded hover:bg-purple-800">
            Sign up for free
          </Link>
        </div>
      </div>
  )
}