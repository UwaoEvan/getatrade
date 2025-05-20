import { Suspense } from "react";
import { getPayments } from "./action";

export default async function Payments() {
  const payments = await getPayments();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2f76d9]"></div>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <h2 className="text-md font-semibold">Payments</h2>
        <table className="min-w-full block md:table">
          <thead className="hidden md:table-header-group bg-gray-50 sticky top-0">
            <tr className="md:table-row">
              <th className="p-3 text-left font-semibold text-gray-700 border-b">
                Date
              </th>
              <th className="p-3 text-left font-semibold text-gray-700 border-b">
                Status
              </th>
              <th className="p-3 text-left font-semibold text-gray-700 border-b">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group bg-white divide-y divide-gray-200">
            {payments?.map((payment, idx) => (
              <tr
                key={idx}
                className="block md:table-row hover:bg-gray-50 text-sm"
              >
                <td className="p-3 block md:table-cell border-b border-gray-50">
                  <span className="md:hidden font-semibold text-gray-600">
                    Date:{" "}
                  </span>
                  {"payment.createdAt"}
                </td>
                <td className="p-3 block md:table-cell border-b border-gray-50">
                  <span className="md:hidden font-semibold text-gray-600">
                    Status:{" "}
                  </span>
                  {payment.status}
                </td>
                <td className="p-3 block md:table-cell border-b border-gray-50 font-bold">
                  <span className="md:hidden font-semibold text-gray-600">
                    Total:{" "}
                  </span>
                  {`£${payment.amount}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments?.length === 0 && (
          <p className="text-center mt-5">No payment records found</p>
        )}
      </div>
    </Suspense>
  );
}
