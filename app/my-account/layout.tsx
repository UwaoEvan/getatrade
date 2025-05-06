import Sidebar from "./components/Sidebar";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="bg-white shadow-md rounded-md p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
