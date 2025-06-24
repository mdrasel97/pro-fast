import {
  FaMapMarkedAlt,
  FaUtensils,
  FaMotorcycle,
  FaSmile,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
      title: "Browse Nearby Restaurants",
      description:
        "Discover popular restaurants and local favorites near you with just a few clicks.",
    },
    {
      icon: <FaUtensils className="text-4xl text-secondary" />,
      title: "Choose Your Meal",
      description:
        "Select your favorite dishes, customize your order, and add to cart easily.",
    },
    {
      icon: <FaMotorcycle className="text-4xl text-accent" />,
      title: "Track Delivery",
      description:
        "Get real-time updates as your meal is prepared and delivered to your door.",
    },
    {
      icon: <FaSmile className="text-4xl text-success" />,
      title: "Enjoy Your Food",
      description:
        "Sit back, relax, and enjoy your delicious meal delivered fast and fresh!",
    },
  ];

  return (
    <section
      data-aos="fade-up"
      className="py-12 px-4 bg-base-100 text-base-content"
      id="how-it-works"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">How It Works</h2>
        <p className="mb-10 text-lg text-gray-500">
          Order food online in just a few simple steps — fast, fresh, and easy!
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
