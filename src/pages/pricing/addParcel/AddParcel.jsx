import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const generateTrackingId = () => {
  const timestamp = Date.now().toString(36).toUpperCase(); // e.g., "LZQ39F"
  const random = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "X9K3"
  return `PCL-${timestamp}-${random}`;
};

const AddParcel = () => {
  const serviceCenters = useLoaderData(); // expects array of centers
  const [parcelType, setParcelType] = useState("document");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Watch selected regions
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Extract unique regions from serviceCenters
  const uniqueRegions = [
    ...new Set(serviceCenters.map((center) => center.region)),
  ];

  // Build a map: region -> all covered_area (service centers)
  const serviceCentersByRegion = serviceCenters.reduce((acc, center) => {
    if (!acc[center.region]) {
      acc[center.region] = new Set();
    }
    center.covered_area.forEach((area) => acc[center.region].add(area));
    return acc;
  }, {});

  // Convert Set to Array
  Object.keys(serviceCentersByRegion).forEach((region) => {
    serviceCentersByRegion[region] = Array.from(serviceCentersByRegion[region]);
  });

  const onSubmit = async (data) => {
    const weight = parcelType === "non-document" ? Number(data.weight) : 0;
    const isWithinDistrict = senderRegion === receiverRegion;

    let baseCost = 0;
    let weightCost = 0;
    let extraExplanation = "";

    if (parcelType === "document") {
      baseCost = isWithinDistrict ? 60 : 80;
      weightCost = 0;
      extraExplanation = isWithinDistrict
        ? "Within district (Flat Rate)"
        : "Outside district (Flat Rate)";
    } else {
      if (weight <= 3) {
        baseCost = isWithinDistrict ? 110 : 150;
        extraExplanation = isWithinDistrict
          ? "Within district (Up to 3kg)"
          : "Outside district (Up to 3kg)";
      } else {
        const extraWeight = weight - 3;
        if (isWithinDistrict) {
          baseCost = 110;
          weightCost = extraWeight * 40;
          extraExplanation = `Within district: ৳110 + ৳${
            extraWeight * 40
          } for ${extraWeight}kg extra`;
        } else {
          baseCost = 150;
          weightCost = extraWeight * 40 + 40; // additional flat 40
          extraExplanation = `Outside district: ৳150 + ৳${
            extraWeight * 40
          } for ${extraWeight}kg extra + ৳40 surcharge`;
        }
      }
    }

    const totalCost = baseCost + weightCost;

    const result = await Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `
      <div style="text-align: left;">
        <p><strong>Parcel Type:</strong> ${parcelType}</p>
        <p><strong>Distance:</strong> ${
          isWithinDistrict ? "Within District" : "Outside District"
        }</p>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${
          weightCost > 0
            ? `<p><strong>Extra Weight Cost:</strong> ৳${weightCost}</p>`
            : ""
        }
        <p style="margin-top:10px;"><strong>Note:</strong> ${extraExplanation}</p>
        <hr/>
        <h3 style="margin-top:15px; font-size: 18px;">Total Delivery Cost: <span style="color:green; font-weight: bold;">৳${totalCost}</span></h3>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back to Edit",
      cancelButtonColor: "#ccc",
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      const parcel = {
        ...data,
        cost: totalCost,
        created_by: user?.email,
        paymentStatus: "unPaid",
        delivery_status: "not_collected",
        creation_date: new Date().toISOString(),
        trackingId: generateTrackingId(),
      };

      // Replace with your actual API call
      console.log("Saving Parcel:", parcel);

      // payment modal
      axiosSecure.post("/parcels", parcel).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          // payment To-Do redirect to the payment page
          Swal.fire("Success!", "Your parcel has been submitted.", "success");
        }
      });
      // save data to the server

      reset();
      setParcelType("document");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-2">Add Parcel</h2>
      <p className="text-gray-600 mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Type */}
        <div className="flex gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="parcelType"
              checked={parcelType === "document"}
              onChange={() => setParcelType("document")}
              className="accent-green-500"
            />
            <span>Document</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="parcelType"
              checked={parcelType === "non-document"}
              onChange={() => setParcelType("non-document")}
              className="accent-green-500"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Parcel Title"
            className="border rounded px-4 py-2 w-full"
            {...register("title", { required: "Title is required" })}
          />
          {parcelType === "non-document" && (
            <>
              <input
                type="number"
                placeholder="Weight (kg)"
                step="0.1"
                min="0"
                className="border rounded px-4 py-2 w-full"
                {...register("weight", {
                  required: "Weight is required for non-documents",
                  min: { value: 0.1, message: "Weight must be positive" },
                })}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </>
          )}
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Sender Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                value="MD RASEL"
                disabled
                className="border rounded px-4 py-2 w-full bg-gray-100"
              />
              <input
                type="text"
                placeholder="Contact"
                {...register("senderContact", {
                  required: "Sender contact is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.senderContact && (
                <p className="text-red-500 text-sm">
                  {errors.senderContact.message}
                </p>
              )}
              <select
                {...register("senderRegion", {
                  required: "Sender region is required",
                })}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <p className="text-red-500 text-sm">
                  {errors.senderRegion.message}
                </p>
              )}
              <select
                {...register("senderServiceCenter", {
                  required: "Sender service center is required",
                })}
                disabled={!senderRegion}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="">Select Service Center</option>
                {serviceCentersByRegion[senderRegion]?.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
              {errors.senderServiceCenter && (
                <p className="text-red-500 text-sm">
                  {errors.senderServiceCenter.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Address"
                {...register("senderAddress", {
                  required: "Sender address is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm">
                  {errors.senderAddress.message}
                </p>
              )}
              <textarea
                placeholder="Pickup Instruction"
                {...register("senderInstruction", {
                  required: "Pickup instruction is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.senderInstruction && (
                <p className="text-red-500 text-sm">
                  {errors.senderInstruction.message}
                </p>
              )}
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Receiver Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm">
                  {errors.receiverName.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Contact"
                {...register("receiverContact", {
                  required: "Receiver contact is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.receiverContact && (
                <p className="text-red-500 text-sm">
                  {errors.receiverContact.message}
                </p>
              )}
              <select
                {...register("receiverRegion", {
                  required: "Receiver region is required",
                })}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <p className="text-red-500 text-sm">
                  {errors.receiverRegion.message}
                </p>
              )}
              <select
                {...register("receiverServiceCenter", {
                  required: "Receiver service center is required",
                })}
                disabled={!receiverRegion}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="">Select Service Center</option>
                {serviceCentersByRegion[receiverRegion]?.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
              {errors.receiverServiceCenter && (
                <p className="text-red-500 text-sm">
                  {errors.receiverServiceCenter.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Address"
                {...register("receiverAddress", {
                  required: "Receiver address is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm">
                  {errors.receiverAddress.message}
                </p>
              )}
              <textarea
                placeholder="Delivery Instruction"
                {...register("receiverInstruction", {
                  required: "Delivery instruction is required",
                })}
                className="border rounded px-4 py-2 w-full"
              />
              {errors.receiverInstruction && (
                <p className="text-red-500 text-sm">
                  {errors.receiverInstruction.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">* Pickup Time 4pm - 7pm Approx.</p>

        <button
          type="submit"
          className="bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
