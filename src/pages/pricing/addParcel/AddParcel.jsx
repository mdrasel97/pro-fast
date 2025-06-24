import React, { useState } from "react";

const AddParcel = () => {
  const [parcelType, setParcelType] = useState("document");
  const [weight, setWeight] = useState("");
  const [formData, setFormData] = useState({
    sender: {
      name: "MD RASEL",
      contact: "",
      region: "",
      serviceCenter: "",
      address: "",
      instruction: "",
    },
    receiver: {
      name: "",
      contact: "",
      region: "",
      serviceCenter: "",
      address: "",
      instruction: "",
    },
    title: "",
  });

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseCost = parcelType === "document" ? 50 : 100;
    const weightCost =
      parcelType === "non-document" && weight ? weight * 10 : 0;
    const totalCost = baseCost + weightCost;

    const confirmed = window.confirm(
      `Delivery Cost: ৳${totalCost}. Confirm to submit?`
    );
    if (confirmed) {
      const parcel = {
        type: parcelType,
        title: formData.title,
        weight: parcelType === "non-document" ? weight : null,
        sender: formData.sender,
        receiver: formData.receiver,
        cost: totalCost,
        creation_date: new Date().toISOString(),
      };

      console.log("Saving Parcel: ", parcel);
      // Replace with your API call here
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-2">Add Parcel</h2>
      <p className="text-gray-600 mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selector */}
        <div className="flex gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="parcelType"
              value="document"
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
              value="non-document"
              checked={parcelType === "non-document"}
              onChange={() => setParcelType("non-document")}
              className="accent-green-500"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* Parcel Title & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Parcel Title"
            className="border rounded px-4 py-2 w-full"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {parcelType === "non-document" && (
            <input
              type="number"
              placeholder="Weight (kg)"
              className="border rounded px-4 py-2 w-full"
              onChange={(e) => setWeight(e.target.value)}
            />
          )}
        </div>

        {/* Sender & Receiver Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Sender Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.sender.name}
                readOnly
                className="border rounded px-4 py-2 w-full bg-gray-100"
              />
              <input
                type="text"
                placeholder="Contact"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("sender", "contact", e.target.value)
                }
              />
              <select
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("sender", "region", e.target.value)
                }
              >
                <option value="">Select Region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
              </select>
              <input
                type="text"
                placeholder="Sender Pickup Warehouse"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("sender", "serviceCenter", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Address"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("sender", "address", e.target.value)
                }
              />
              <textarea
                placeholder="Pickup Instruction"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("sender", "instruction", e.target.value)
                }
              ></textarea>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Receiver Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Receiver Name"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("receiver", "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Contact"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("receiver", "contact", e.target.value)
                }
              />
              <select
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("receiver", "region", e.target.value)
                }
              >
                <option value="">Select Region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
              </select>
              <input
                type="text"
                placeholder="Receiver Delivery Warehouse"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("receiver", "serviceCenter", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Address"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("receiver", "address", e.target.value)
                }
              />
              <textarea
                placeholder="Delivery Instruction"
                required
                className="border rounded px-4 py-2 w-full"
                onChange={(e) =>
                  handleInputChange("receiver", "instruction", e.target.value)
                }
              ></textarea>
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
