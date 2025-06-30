import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure(); // ✅ Correct use of the hook
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data.data;
    },
  });

  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to deactivate this rider.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/api/riders/deactivate/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Rider has been deactivated.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to deactivate rider.");
      }
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 px-4 py-2 border rounded w-full max-w-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Loading State */}
      {isLoading ? (
        <p>Loading active riders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Region</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Bike</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider) => (
                <tr key={rider._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{rider.name}</td>
                  <td className="p-3">{rider.email}</td>
                  <td className="p-3">{rider.phone}</td>
                  <td className="p-3">{rider.region}</td>
                  <td className="p-3">{rider.district}</td>
                  <td className="p-3">
                    {rider.bikeBrand} - {rider.bikeRegistration}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 p-4">
                    No active riders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
