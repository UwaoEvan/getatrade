const payments = [
  { date: "22/01/2024", status: "Paid", total: "£61.20" },
  { date: "22/01/2024", status: "Paid", total: "£61.20" },
  { date: "22/01/2024", status: "Paid", total: "£61.20" },
  { date: "22/01/2024", status: "Paid", total: "£61.20" },
];

export default function Payments() {
  return (
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
          {payments.map((payment, idx) => (
            <tr
              key={idx}
              className="block md:table-row hover:bg-gray-50 text-sm"
            >
              <td className="p-3 block md:table-cell border-b border-gray-50">
                <span className="md:hidden font-semibold text-gray-600">
                  Date:{" "}
                </span>
                {payment.date}
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
                {payment.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
