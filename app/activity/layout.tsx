import Sidebar from "./components/Sidebar";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm md:text-2xl font-bold">Activity</p>
        <div className="flex flex-col md:flex-row  min-h-screen">
          <Sidebar />
          <main className="flex-1">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
