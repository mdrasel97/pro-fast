import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/loading/Loading";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data.data;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  const handleApprove = async (id, email) => {
    try {
      const res = await axiosSecure.patch(`/riders/approve/${id}`, {
        status: "approve",
        email,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Rider approved successfully.", "success");
        setSelectedRider(null);
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to approve rider.", err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Rider Rejected", "Application has been canceled.", "info");
        setSelectedRider(null);
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to reject rider.", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Region</th>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id} className="border-t">
                <td className="p-3">{rider.name}</td>
                <td className="p-3">{rider.email}</td>
                <td className="p-3">{rider.phone}</td>
                <td className="p-3">{rider.region}</td>
                <td className="p-3">{rider.district}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Name:</strong> {selectedRider.name}
              </li>
              <li>
                <strong>Email:</strong> {selectedRider.email}
              </li>
              <li>
                <strong>Phone:</strong> {selectedRider.phone}
              </li>
              <li>
                <strong>Age:</strong> {selectedRider.age}
              </li>
              <li>
                <strong>Region:</strong> {selectedRider.region}
              </li>
              <li>
                <strong>District:</strong> {selectedRider.district}
              </li>
              <li>
                <strong>NID:</strong> {selectedRider.nid}
              </li>
              <li>
                <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
              </li>
              <li>
                <strong>Bike Registration:</strong>{" "}
                {selectedRider.bikeRegistration}
              </li>
              <li>
                <strong>Applied At:</strong>{" "}
                {new Date(selectedRider.appliedAt).toLocaleString()}
              </li>
            </ul>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => handleReject(selectedRider._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() =>
                  handleApprove(selectedRider._id, selectedRider.email)
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  setSelectedRider(selectedRider, selectedRider.email)
                }
                className="ml-auto text-gray-500 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
