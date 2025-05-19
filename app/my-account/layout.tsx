import Sidebar from "./components/Sidebar";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="p-4 flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">My Account</h1>
        </div>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar />
          <main className="flex-1">
            <div className="p-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
