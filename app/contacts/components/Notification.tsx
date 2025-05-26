import { format, formatDistanceToNow } from "date-fns";
import { MapPin, Bell } from "lucide-react";
import Link from "next/link";

type ShortlistProps = {
  shortlist: Shortlist;
};

type Shortlist = {
  id: string;
  title: string;
  description: string;
  category: string;
  project: string;
  createdAt: Date;
  location: string;
  userId: number;
  interested: number;
  shortlisted: number;
  closedAt: Date;
  active: boolean;
  jobId: string;
  paid: boolean;
  username: string;
  jobPosterId: number;
};

export default function Notification({ shortlist }: ShortlistProps) {
  const time = formatDistanceToNow(shortlist.createdAt, { addSuffix: true });
  return (
    <Link
      href={`/messages?jobId=${shortlist.jobId}&target=${shortlist.id}&from=${shortlist.userId}&title=${shortlist.title}&time=${time}&location=${shortlist.location}`}
      className="w-full mx-auto bg-white mb-2"
    >
      <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-lg"></div>
        <div className="p-4 pl-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">
                  {shortlist.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {shortlist.username}
                </h3>
                <p className="text-gray-900 text-md font-medium">
                  {shortlist.title}
                </p>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{shortlist.location}</span>
                </div>
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              {format(shortlist.createdAt || "", "dd-MM-yyyy")}
            </span>
          </div>
          <p className="text-gray-700 text-sm">
            Great news, you have been shortlisted for &quot;{shortlist.category}&quot;.
          </p>

          {/* <div className="flex items-center space-x-6">
            <div className="flex items-center text-green-600">
              <Check className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Hired!</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Review requested</span>
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export function EmptyState() {
  return (
    <div className="mx-auto">
      <div className="pt-6">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            When you request reviews or receive updates from clients, they&apos;ll
            appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
