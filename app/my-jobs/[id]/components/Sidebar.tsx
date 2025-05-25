"use client";
import Link from "next/link";
import Tradesperson from "./Tradesperson";

type Props = {
  id?: string;
};

const Sidebar = ({ id }: Props) => {
  return (
    <aside className="w-full max-w-xs space-y-6 text-sm text-gray-900 pb-6">
      <div className="border-[1px] border-gray-300 pt-2">
        <h2 className="font-semibold text-base mb-2 px-4 py-2">
          Interested tradespeople
        </h2>
        <hr className="text-gray-300" />
        <p className="text-gray-700 mb-4 px-4 pt-4">
          These tradespeople responded to your job. Start chats to exchange
          contact details, then get in touch to discuss a quote.
        </p>

        <div className="divide-y divide-gray-200 overflow-hidden">
          <Tradesperson jobId={id} />
        </div>
      </div>

      <div className="border-[1px] border-gray-300 pt-2">
        <h2 className="font-semibold text-base mb-2 px-4 py-2">
          Get more responses
        </h2>
        <hr className="text-gray-300" />
        <p className="text-gray-700 my-4 px-4">
          Invite 10 more recommended tradespeople to get more responses.
        </p>
        <hr className="text-gray-300" />

        <Link href="#" className="block text-[#2f76d9] font-medium my-4 px-4">
          View recommended tradespeople
        </Link>
      </div>

      <div className="border-[1px] border-gray-300 ">
        <h2 className="font-semibold text-base my-2 px-4 py-2">Job details</h2>
        <hr className="text-gray-300" />
        <p className="py-4 text-md px-4">Painting</p>
        <div className="flex flex-col space-y-2">
          <Link
            href={`/my-jobs/${id}`}
            className="block text-[#2f76d9] font-medium mb-4 px-4"
          >
            View details
          </Link>
          <Link href="#" className="block text-[#2f76d9] font-medium mb-4 px-4">
            Edit
          </Link>
          <Link
            href={`/my-jobs/${id}/close`}
            className="block text-[#2f76d9] font-medium mb-4 px-4"
          >
            Close job
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
