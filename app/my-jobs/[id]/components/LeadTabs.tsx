"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InterestedPerson from "./InterestedPerson";
import Shortlisted from "./Shortlisted";

type Props = {
  jobId: string;
  interests: Interest[];
  shortlists: any[];
  jobPoster?: number;
};

type Interest = {
  id: string;
  jobId: string;
  userId: number;
  user: {
    username: string;
    location?: string | null;
  };
};

export default function LeadTabs({
  jobId,
  interests,
  shortlists,
  jobPoster,
}: Props) {
  const [activeTab, setActiveTab] = useState<"interested" | "shortlisted">(
    "interested",
  );

  return (
    <div>
      <div className="flex space-x-4 border-b mb-4">
        {["interested", "shortlisted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "interested" | "shortlisted")}
            className={`py-2 px-4 font-semibold ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "interested" && (
        <div>
          <div className="flex flex-wrap gap-4">
            {interests.map((interest) => (
              <InterestedPerson key={interest.id} interest={interest} />
            ))}
          </div>
          {interests.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg font-medium">
                No one has shown interest yet.
              </p>
              <p className="text-sm">
                Tradespeople who express interest will appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "shortlisted" && (
        <div>
          {shortlists.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg font-medium">
                No one has been shortlisted yet.
              </p>
              <p className="text-sm">
                Tradespeople you shortlist will appear here.
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {shortlists.map((shortlist) => (
              <Shortlisted
                key={shortlist.shortlistId}
                userId={shortlist.userId}
                location={shortlist.location}
                name={shortlist.username}
                jobId={jobId}
                jobPoster={jobPoster}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
