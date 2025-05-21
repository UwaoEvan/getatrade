import Image from "next/image";
import User from "@/public/userGroup.svg";
import { getUser } from "@/app/lib/actions";
import GeneralProfile from "../components/CompanyProfile";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Params) {
  const { id } = await params;
  const user = await getUser("", parseInt(id));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 max-w-2xl p-4">
        <Image
          src={User}
          alt="McKenzie Logo"
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h1
            title={user?.username}
            className="text-lg font-bold truncate max-w-3xl overflow-hidden whitespace-nowrap"
          >
            {user?.username}
          </h1>

          <div className="flex items-center text-sm text-gray-700 mt-1">
            <svg
              className="w-4 h-4 text-[#fd914d] mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.89 1.518 4.674c.3.921-.755 1.688-1.538 1.118L10 15.347l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.915l1.518-4.674z" />
            </svg>
            <span>0/0</span>
            <span className="ml-1 text-gray-500">(reviews)</span>
          </div>

          <div className="flex items-center text-sm text-gray-700 mt-1">
            <svg
              className="w-4 h-4 mr-1 text-[#fe3333]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span>{user?.location}</span>
          </div>
        </div>
      </div>
      <hr className="mb-4 border-t-1 border-gray-200" />

      <GeneralProfile email={user?.email} about={user?.about || ""} />
    </div>
  );
}
