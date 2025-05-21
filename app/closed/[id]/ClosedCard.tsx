export default function ClosedCard() {
  return (
    <div className="w-full md:w-[300px] border-1 border-gray-200 p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Job status</h2>
      <p className="text-sm font-semibold text-red-500 bg-red-100 p-2 rounded mb-3">
        This job has been closed for applications.
      </p>
    </div>
  );
}
