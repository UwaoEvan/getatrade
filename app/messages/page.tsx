import React from "react";

export default function Messages() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen mx-auto bg-gray-100 p-6 font-sans text-sm">
      <div className="md:w-[880px] mx-auto flex">
        <div className=" bg-white rounded-xl border border-gray-200">
          <div className="border-b p-4 font-semibold text-base">
            Brendan O Shea
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-purple-200 text-purple-700 rounded-full text-xs font-bold flex items-center justify-center mr-2">
                B
              </div>
              <div className="bg-gray-100 p-3 rounded-md max-w-md">
                if you need to contact me my number is 07711589839.
                <div className="text-gray-400 text-xs text-right mt-1">
                  14:51
                </div>
              </div>
            </div>

            <div className="flex items-start justify-end">
              <div className="bg-purple-50 p-3 rounded-md max-w-md">
                Thank you I will be sure contact you via your mobile . Thank you
                <div className="text-gray-400 text-xs text-right mt-1">
                  Read 14:53
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-purple-200 text-purple-700 rounded-full text-xs font-bold flex items-center justify-center mr-2">
                B
              </div>
              <div className="bg-gray-100 p-3 rounded-md max-w-md">
                No problem, will you been attending tomorrow 9:30AM to have a
                look?
                <div className="text-gray-400 text-xs text-right mt-1">
                  15:00
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 py-2 border-t border-gray-200">
              Wed, 03 Apr 2024
            </div>

            {/* Review notification */}
            <div className="bg-purple-50 border border-purple-200 rounded-md p-4 flex items-center justify-between">
              <p>✅ Brendan O Shea has written a review for this job.</p>
              <button className="text-purple-700 border border-purple-700 rounded-md px-3 py-1 text-sm hover:bg-purple-100">
                View review
              </button>
            </div>
          </div>

          {/* Message input */}
          <div className="border-t p-4">
            <input
              type="text"
              placeholder="Your message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full lg:w-80 mt-6 lg:mt-0 lg:ml-6 space-y-6">
          {/* Contact details */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="font-semibold">Contact details</h3>
            <div className="bg-green-50 text-green-800 p-2 rounded-md text-sm">
              ✅ You've been hired for this job
            </div>
            <a href="#" className="text-purple-700 text-sm underline">
              View review
            </a>
            <div className="text-sm">
              📞{" "}
              <a href="tel:+447711589839" className="underline">
                +447711589839
              </a>
            </div>
            <div className="text-sm">
              📧{" "}
              <a
                href="mailto:brendan@accommodation-yes.com"
                className="underline"
              >
                brendan@accommodation-yes.com
              </a>
            </div>
          </div>

          {/* Job details */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="font-semibold">Small plastering job</h3>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
              Repeat customer
            </span>
            <ul className="text-sm space-y-1 mt-2">
              <li>💬 2 responses</li>
              <li>⏱ over 1 year ago</li>
              <li>
                💷 You've been charged <strong>£18.50</strong> + VAT
              </li>
              <li>📍 Maidstone (1 miles)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
