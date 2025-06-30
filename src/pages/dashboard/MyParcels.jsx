import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye, FaTrashAlt, FaMoneyCheckAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// import { format } from "date-fns";

const MyParcels = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch, // <-- add this
    error,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email, // user email না থাকলে query রান করবে না
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);

        if (res?.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
          refetch();
        } else {
          Swal.fire("Failed!", "Parcel could not be deleted.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handlePay = (id) => {
    console.log("procedd to pay", id);
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-100 dark:bg-gray-800 text-xs font-semibold uppercase">
          <tr>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Cost (৳)</th>
            <th className="px-6 py-3">Payment</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr
              key={parcel._id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-6 py-4">
                {parseFloat(parcel.weight) <= 0.5 ? (
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Document
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                    Non-document
                  </span>
                )}
              </td>
              <td className="px-6 py-4">{formatDate(parcel.creation_date)}</td>
              <td className="px-6 py-4 font-medium">৳ {parcel.cost}</td>
              <td className="px-6 py-4">
                {parcel.paymentStatus === "paid" ? (
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                    Unpaid
                  </span>
                )}
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => console.log("View", parcel._id)}
                  className="text-blue-600 hover:text-blue-800"
                  title="View Details"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handlePay(parcel._id)}
                  className="text-green-600 hover:text-green-800"
                  disabled={parcel.paymentStatus === "paid"}
                  title="Pay Now"
                >
                  <FaMoneyCheckAlt />
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  // onClick={() => console.log("Delete", parcel._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
