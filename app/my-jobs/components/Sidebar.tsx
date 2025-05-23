"use client";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-full max-w-xs space-y-6 text-sm text-gray-900">
      <div className="border-[1px] border-gray-300 pt-2">
        <h2 className="font-semibold text-base mb-2 px-4">Interested tradespeople</h2>
        <hr className="text-gray-300"/>
        <p className="text-gray-700 mb-4 px-4 pt-4">
          These tradespeople responded to your job. Start chats to exchange contact details, then get in touch to discuss a quote.
        </p>

        <div className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
          {/* Tradesperson 1 */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-3">
              <Image
                src="/avatar1.png" // Replace with actual image or placeholder
                alt="Redyan"
                width={36}
                height={36}
                className="rounded-full"
              />
              <div>
                <div className="text-purple-800 font-medium">Redyan</div>
                <div className="text-green-600 text-xs">New on MyBuilder</div>
              </div>
            </div>
            <span className="text-gray-400">{'>'}</span>
          </div>

          {/* Tradesperson 2 */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-3">
              <Image
                src="/avatar2.png"
                alt="Painter Decorator"
                width={36}
                height={36}
                className="rounded-full"
              />
              <div>
                <div className="text-purple-800 font-medium">Painter Decorator</div>
                <div className="text-xs text-gray-600">⭐ 5/5 (186 reviews)</div>
              </div>
            </div>
            <span className="text-gray-400">{'>'}</span>
          </div>
        </div>
      </div>

      {/* Get more responses */}
      <div className="border-[1px] border-gray-300 pt-2">
        <h2 className="font-semibold text-base mb-2 px-4">Get more responses</h2>
        <hr className="text-gray-300"/>
        <p className="text-gray-700 my-4 px-4">
          Invite 10 more recommended tradespeople to get more responses.
        </p>
        <hr className="text-gray-300"/>
        
        <Link
          href="#"
          className="block text-purple-700 font-medium my-4 px-4"
        >
          View recommended tradespeople
        </Link>
      </div>

      {/* Job Details */}
      <div className="border-[1px] border-gray-300 ">
        <h2 className="font-semibold text-base my-2 px-4">Job details</h2>
        <hr className="text-gray-300"/>
        <p className="mb-2 px-4">painting</p>
        <div className="flex flex-col space-y-2 px-4">
          <a href="#" className="text-purple-700">View details</a>
          <a href="#" className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Edit</a>
          <a href="#" className="text-purple-700 underline">Close job</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
