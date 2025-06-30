import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4">#</th>
              <th className="text-left py-2 px-4">Transaction ID</th>
              <th className="text-left py-2 px-4">Amount</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Parcel ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{payment.transactionId}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">
                    ৳{payment.amount}
                  </td>
                  <td
                    className={`py-2 px-4 font-medium ${
                      payment.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(payment.paidAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-blue-600">
                    {payment.parcelId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
