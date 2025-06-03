"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatsCard from "../components/StatsCard";

interface Transaction {
  id: string;
  type: "Income" | "Expense" | "Transfer" | "Refund";
  status: "Completed" | "Pending" | "Failed" | "Cancelled";
  amount: number;
  currency: string;
  description: string;
  category: string;
  paymentMethod:
    | "Credit Card"
    | "Bank Transfer"
    | "PayPal"
    | "Cash"
    | "Mobile Payment";
  from: {
    name: string;
    account: string;
    initials: string;
  };
  to: {
    name: string;
    account: string;
    initials: string;
  };
  date: string;
  time: string;
  reference: string;
  fee: number;
  balance: number;
  tags: string[];
  notes?: string;
}

const transactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "Income",
    status: "Completed",
    amount: 2500.0,
    currency: "USD",
    description: "Salary Payment - January 2024",
    category: "Salary",
    paymentMethod: "Bank Transfer",
    from: {
      name: "TechCorp Inc.",
      account: "****1234",
      initials: "TC",
    },
    to: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    date: "2024-01-15",
    time: "09:30 AM",
    reference: "SAL-JAN-2024",
    fee: 0,
    balance: 8750.0,
    tags: ["salary", "monthly", "recurring"],
  },
  {
    id: "TXN-002",
    type: "Expense",
    status: "Completed",
    amount: 89.99,
    currency: "USD",
    description: "Monthly Subscription - Netflix",
    category: "Entertainment",
    paymentMethod: "Credit Card",
    from: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    to: {
      name: "Netflix Inc.",
      account: "****9876",
      initials: "NF",
    },
    date: "2024-01-14",
    time: "02:15 PM",
    reference: "SUB-NETFLIX-JAN",
    fee: 2.5,
    balance: 8660.01,
    tags: ["subscription", "entertainment", "monthly"],
  },
  {
    id: "TXN-003",
    type: "Transfer",
    status: "Pending",
    amount: 500.0,
    currency: "USD",
    description: "Transfer to Savings Account",
    category: "Savings",
    paymentMethod: "Bank Transfer",
    from: {
      name: "John Doe - Checking",
      account: "****5678",
      initials: "JD",
    },
    to: {
      name: "John Doe - Savings",
      account: "****9012",
      initials: "JD",
    },
    date: "2024-01-13",
    time: "11:45 AM",
    reference: "TRF-SAV-001",
    fee: 0,
    balance: 8160.01,
    tags: ["savings", "internal", "transfer"],
  },
  {
    id: "TXN-004",
    type: "Expense",
    status: "Failed",
    amount: 1200.0,
    currency: "USD",
    description: "Rent Payment - January 2024",
    category: "Housing",
    paymentMethod: "Bank Transfer",
    from: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    to: {
      name: "Property Management Co.",
      account: "****3456",
      initials: "PM",
    },
    date: "2024-01-12",
    time: "08:00 AM",
    reference: "RENT-JAN-2024",
    fee: 5.0,
    balance: 8160.01,
    tags: ["rent", "housing", "monthly"],
    notes: "Payment failed due to insufficient funds",
  },
  {
    id: "TXN-005",
    type: "Income",
    status: "Completed",
    amount: 150.0,
    currency: "USD",
    description: "Freelance Project Payment",
    category: "Freelance",
    paymentMethod: "PayPal",
    from: {
      name: "StartupXYZ",
      account: "****7890",
      initials: "SX",
    },
    to: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    date: "2024-01-11",
    time: "04:30 PM",
    reference: "PROJ-WEB-001",
    fee: 7.5,
    balance: 8310.01,
    tags: ["freelance", "project", "web-design"],
  },
  {
    id: "TXN-006",
    type: "Expense",
    status: "Completed",
    amount: 45.67,
    currency: "USD",
    description: "Grocery Shopping - Whole Foods",
    category: "Food & Dining",
    paymentMethod: "Credit Card",
    from: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    to: {
      name: "Whole Foods Market",
      account: "****2468",
      initials: "WF",
    },
    date: "2024-01-10",
    time: "06:45 PM",
    reference: "GRC-WF-001",
    fee: 0,
    balance: 8264.34,
    tags: ["groceries", "food", "essentials"],
  },
  {
    id: "TXN-007",
    type: "Refund",
    status: "Completed",
    amount: 79.99,
    currency: "USD",
    description: "Product Return - Amazon",
    category: "Refund",
    paymentMethod: "Credit Card",
    from: {
      name: "Amazon Inc.",
      account: "****1357",
      initials: "AM",
    },
    to: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    date: "2024-01-09",
    time: "01:20 PM",
    reference: "REF-AMZ-001",
    fee: 0,
    balance: 8344.33,
    tags: ["refund", "return", "amazon"],
  },
  {
    id: "TXN-008",
    type: "Expense",
    status: "Cancelled",
    amount: 299.99,
    currency: "USD",
    description: "Online Course Purchase",
    category: "Education",
    paymentMethod: "Mobile Payment",
    from: {
      name: "John Doe",
      account: "****5678",
      initials: "JD",
    },
    to: {
      name: "Udemy Inc.",
      account: "****8024",
      initials: "UD",
    },
    date: "2024-01-08",
    time: "10:15 AM",
    reference: "EDU-UDEMY-001",
    fee: 0,
    balance: 8344.33,
    tags: ["education", "course", "cancelled"],
  },
];

const stats = [
  {
    title: "Total Income",
    value: "$12,450.00",
    change: "+15% from last month",
    trend: "up",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
];

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Cancelled":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Income":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Expense":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Transfer":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Refund":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
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
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" ||
      transaction.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "all" ||
      transaction.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-600 mt-1">
                Track and manage all your financial transactions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex">
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Transactions List */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>
              All Transactions ({filteredTransactions.length})
            </CardTitle>
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
                      Type & Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From/To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
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
                                {getPaymentMethodIcon(
                                  transaction.paymentMethod,
                                )}
                                {transaction.paymentMethod}
                              </span>
                              <span>•</span>
                              <span>{transaction.reference}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {transaction.tags
                                .slice(0, 2)
                                .map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              {transaction.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{transaction.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <Badge
                            className={getTypeBadgeColor(transaction.type)}
                          >
                            {transaction.type}
                          </Badge>
                          <Badge
                            className={getStatusBadgeColor(transaction.status)}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-right">
                          <div
                            className={`text-lg font-semibold ${
                              transaction.type === "Income" ||
                              transaction.type === "Refund"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "Income" ||
                            transaction.type === "Refund"
                              ? "+"
                              : "-"}
                            {formatAmount(
                              transaction.amount,
                              transaction.currency,
                            )}
                          </div>
                          {transaction.fee > 0 && (
                            <div className="text-xs text-gray-500">
                              Fee:{" "}
                              {formatAmount(
                                transaction.fee,
                                transaction.currency,
                              )}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            Balance:{" "}
                            {formatAmount(
                              transaction.balance,
                              transaction.currency,
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 bg-gray-100">
                              <AvatarFallback className="text-xs text-gray-600">
                                {transaction.from.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {transaction.from.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {transaction.from.account}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowDownLeft className="h-3 w-3 text-gray-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 bg-gray-100">
                              <AvatarFallback className="text-xs text-gray-600">
                                {transaction.to.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {transaction.to.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {transaction.to.account}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {transaction.time}
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenModal(transaction)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {transaction.status === "Failed" && (
                              <DropdownMenuItem className="text-blue-600">
                                Retry Transaction
                              </DropdownMenuItem>
                            )}
                            {transaction.status === "Pending" && (
                              <DropdownMenuItem className="text-red-600">
                                Cancel Transaction
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
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

      {/* Transaction Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              {/* Transaction Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {selectedTransaction.type === "Income" ? (
                      <ArrowDownLeft className="h-6 w-6 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedTransaction.description}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ID: {selectedTransaction.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold ${
                      selectedTransaction.type === "Income" ||
                      selectedTransaction.type === "Refund"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.type === "Income" ||
                    selectedTransaction.type === "Refund"
                      ? "+"
                      : "-"}
                    {formatAmount(
                      selectedTransaction.amount,
                      selectedTransaction.currency,
                    )}
                  </div>
                  <Badge
                    className={getStatusBadgeColor(selectedTransaction.status)}
                  >
                    {selectedTransaction.status}
                  </Badge>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">From</h4>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 bg-blue-100">
                        <AvatarFallback className="text-blue-600">
                          {selectedTransaction.from.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {selectedTransaction.from.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedTransaction.from.account}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">To</h4>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 bg-blue-100">
                        <AvatarFallback className="text-blue-600">
                          {selectedTransaction.to.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {selectedTransaction.to.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedTransaction.to.account}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Date</h4>
                      <p className="text-gray-600">
                        {new Date(
                          selectedTransaction.date,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Time</h4>
                      <p className="text-gray-600">
                        {selectedTransaction.time}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Payment Method
                    </h4>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(selectedTransaction.paymentMethod)}
                      <span className="text-gray-600">
                        {selectedTransaction.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                    <p className="text-gray-600">
                      {selectedTransaction.category}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Reference
                    </h4>
                    <p className="text-gray-600 font-mono text-sm">
                      {selectedTransaction.reference}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  Financial Summary
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-semibold">
                      {formatAmount(
                        selectedTransaction.amount,
                        selectedTransaction.currency,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fee</p>
                    <p className="font-semibold">
                      {formatAmount(
                        selectedTransaction.fee,
                        selectedTransaction.currency,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Balance After</p>
                    <p className="font-semibold">
                      {formatAmount(
                        selectedTransaction.balance,
                        selectedTransaction.currency,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTransaction.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedTransaction.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-600 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    {selectedTransaction.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
