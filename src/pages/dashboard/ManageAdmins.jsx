import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageAdmins = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      setSearchedUsers(res.data);
    } catch (err) {
      console.error("Search error:", err);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/make-admin/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "User has been made an admin", "success");
      handleSearch();
    }
  };

  const handleRemoveAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/remove-admin/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Admin role removed", "success");
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email"
          className="border rounded px-4 py-2 w-full"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : searchedUsers.length > 0 ? (
        <table className="w-full border shadow bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="p-3 capitalize">{user.role || "user"}</td>
                <td className="p-3">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default ManageAdmins;
