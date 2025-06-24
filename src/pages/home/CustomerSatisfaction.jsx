import React from "react";
import locationImg from "../../assets/location-merchant.png";
const CustomerSatisfaction = () => {
  return (
    <section className="rounded-xl bg-[#003E3E] text-white py-10 px-6 md:px-16 relative overflow-hidden my-10 w-11/12 mx-auto">
      {/* Background wave image (optional) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
        {/* You can use an SVG background here */}
        <img
          src="/wave-bg.svg"
          alt="wave background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Text Section */}
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-300 mb-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Profast courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="btn bg-lime-400 text-black font-semibold hover:bg-lime-500">
              Become a Merchant
            </button>
            <button className="btn border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="max-w-md w-full">
          <img
            src={locationImg}
            alt="Parcel Box Illustration"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerSatisfaction;
