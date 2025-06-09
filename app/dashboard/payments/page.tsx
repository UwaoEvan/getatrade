"use client";

import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  ArrowUpRight,
  CreditCard,
  Banknote,
  Smartphone,
  Calendar,
  PoundSterling,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatsCard from "../components/StatsCard";
import { fetchPayments } from "./action";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  userId: number;
  jobId: string;
  createdAt: Date | null;
  status: string | null;
}

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    const payments = await fetchPayments();
    setTransactions(payments);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "FAILED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-4 w-4" />;
      case "Bank Transfer":
        return <Banknote className="h-4 w-4" />;
      case "Mobile Payment":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <PoundSterling className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 space-y-6">
        <div className="flex">
          <StatsCard
            stat={{
              title: "Total Transactions",
              value: transactions?.length,
              change: "+12% from last month",
              icon: PoundSterling,
              color: "bg-blue-100 text-blue-600",
            }}
          />
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>All Transactions ({transactions?.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions?.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ArrowUpRight className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {transaction.description}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                {getPaymentMethodIcon("Credit Card")}
                                Credit Card
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <Badge
                            className={getStatusBadgeColor(
                              transaction?.status as string,
                            )}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-right">
                          <div
                            className={`text-lg font-semibold "text-green-600"`}
                          >
                            {"+"}
                            {transaction.amount}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              transaction?.createdAt || "",
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
