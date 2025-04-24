"use client"
import Image from 'next/image'
import { useState } from 'react'
import Person from "@/public/signup-image.webp";
import ReliableWork from './components/ReliableWork';
import FindWork from './components/FindWork';

export default function TradeWorkSignup() {
  const [formData, setFormData] = useState({
    trade: '',
    postcode: '',
    email: '',
  })

  // @ts-expect-error any error
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // @ts-expect-error any error
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
      <FindWork/>
      <ReliableWork/>
    </div>
  )
}
