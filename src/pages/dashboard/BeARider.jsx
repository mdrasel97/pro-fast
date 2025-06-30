import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

  // Extract unique regions
  const regions = [...new Set(serviceCenters.map((item) => item.region))];

  // Get districts based on selected region
  const districts = serviceCenters
    .filter((item) => item.region === selectedRegion)
    .map((item) => item.district);

  const onSubmit = async (data) => {
    const riderApplication = {
      name: user?.displayName,
      email: user?.email,
      age: data.age,
      region: data.region,
      district: data.district,
      phone: data.phone,
      nid: data.nid,
      bikeBrand: data.bikeBrand,
      bikeRegistration: data.bikeRegistration,
      status: "pending", // default status
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderApplication);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Application submitted successfully.", "success");
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit application.", "error");
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Become a Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="border px-4 py-2 w-full bg-gray-100"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="border px-4 py-2 w-full bg-gray-100"
        />

        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
          className="border px-4 py-2 w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            {...register("region", { required: true })}
            className="border px-4 py-2 w-full"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            {...register("district", { required: true })}
            className="border px-4 py-2 w-full"
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Phone Number"
          {...register("phone", { required: true })}
          className="border px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="National ID Card Number"
          {...register("nid", { required: true })}
          className="border px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Bike Brand"
          {...register("bikeBrand", { required: true })}
          className="border px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Bike Registration Number"
          {...register("bikeRegistration", { required: true })}
          className="border px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 w-full font-bold text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
