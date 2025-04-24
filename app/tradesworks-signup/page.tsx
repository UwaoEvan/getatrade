"use client"
import Image from 'next/image'
import { useState } from 'react'
import Person from "@/public/signup-image.webp";
import Step1 from "@/public/job-finding-step-1.svg";
import Step2 from "@/public/job-finding-step-2.svg";
import Step3 from "@/public/job-finding-step-3.svg";
import Link from 'next/link';

export default function TradeWorkSignup() {
  const [formData, setFormData] = useState({
    trade: '',
    postcode: '',
    email: '',
  })

  // @ts-ignore
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="bg-white">
      <div className="w-full md:w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 flex flex-col justify-center text-black">
          <h1 className="text-3xl font-bold mb-6">The reliable way to get work you want</h1>
          <form onSubmit={handleSubmit} className="bg-gray-300 text-black p-6 rounded-md space-y-4">
            <input
              type="text"
              name="trade"
              placeholder="Your main trade"
              className="w-full bg-white border border-gray-300 p-2 rounded"
              value={formData.trade}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postcode"
              placeholder="Your postcode"
              className="w-full border bg-white border-gray-300 p-2 rounded"
              value={formData.postcode}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email to receive leads"
              className="w-full bg-white border border-gray-300 p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500">
              By clicking Sign up for free, you agree to MyBuilder Terms and Conditions. For information on how we process your data, see our Privacy policy.
            </p>
            <button type="submit" className="w-full bg-[#2f76d9] text-white py-2 rounded hover:bg-purple-800">
              Sign up for free
            </button>
          </form>
        </div>
        <div className="hidden md:block relative h-[500px]">
          <Image src={Person} alt="Worker" fill className="object-cover" />
        </div>
      </div>

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
    </div>
  )
}
