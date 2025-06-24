const benefits = [
  {
    title: "Fast & Reliable Delivery",
    description:
      "We ensure your parcels are delivered on time with real-time tracking and smart route optimization.",
    image: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  },
  {
    title: "Affordable Pricing",
    description:
      "Lowest delivery rates with no hidden fees. Grow your business with our budget-friendly courier services.",
    image: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
  },
  {
    title: "Nationwide Coverage",
    description:
      "Deliver to every corner of Bangladesh. Our wide network ensures coverage in both cities and villages.",
    image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-10 px-4 bg-base-100 text-base-content" id="benefits">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Why Choose ProFast?</h2>
        <p className="text-gray-500 mt-2">
          Enjoy the core benefits that make Profast stand out.
        </p>
      </div>

      <div className="space-y-10">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-8 bg-base-200 p-6 rounded-xl shadow-md"
          >
            {/* Left side image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Right side text */}
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
