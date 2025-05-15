import { signOut } from "../lib/auth";
import Sidebar from "./components/Sidebar";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">My Account</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 mr-2 px-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
              <div>Sign Out</div>
            </button>
          </form>
        </div>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8">
            <div className="bg-white shadow-md rounded-md p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
