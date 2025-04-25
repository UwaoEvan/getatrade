import { signOut } from "@/auth";

export default function Dashboard() {
  const jobs = [
    {
      title: "Install new kitchen",
      category: "Restoration & Refurbishment",
      location: "Doncaster (12 miles)",
      time: "1 day ago",
    },
    {
      title: "Wall papering 1 wall",
      category: "Painting & Decorating",
      location: "Doncaster (16 miles)",
      time: "1 day ago",
    },
    {
      title: "Extension",
      category: "Extensions",
      location: "Sheffield (19 miles)",
      time: "2 days ago",
    },
    {
      title: "Need concrete fence posts straightening/new 5ft panels",
      category: "Fencing",
      location: "Worksop (7 miles)",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen mx-auto bg-gray-100 p-6">
      <div className="w-full px-4 md:w-[880px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 px-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
              <div>Sign Out</div>
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md"
            >
              <h2 className="text-purple-700 font-semibold mb-1">
                {job.title}
              </h2>
              <div className="text-gray-500 text-sm flex flex-wrap gap-2">
                <span>{job.category}</span>•<span>{job.location}</span>•
                <span>{job.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
