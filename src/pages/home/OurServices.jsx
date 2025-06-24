import {
  FaShoppingCart,
  FaGift,
  FaClock,
  FaMapMarkerAlt,
  FaHeadset,
  FaHamburger,
} from "react-icons/fa";

const services = [
  {
    // icon: <FaBurger className="text-4xl text-primary" />,
    icon: <FaHamburger className="text-4xl text-primary" />,
    title: "Fast Food Delivery",
    description:
      "Get your favorite fast food delivered hot and fresh in no time.",
  },
  {
    icon: <FaShoppingCart className="text-4xl text-secondary" />,
    title: "Grocery Shopping",
    description:
      "Order daily essentials and groceries from your trusted stores.",
  },
  {
    icon: <FaGift className="text-4xl text-accent" />,
    title: "Gift Delivery",
    description:
      "Send gifts to your loved ones with same-day delivery options.",
  },
  {
    icon: <FaClock className="text-4xl text-warning" />,
    title: "Scheduled Orders",
    description:
      "Place orders ahead of time and receive them exactly when you need.",
  },
  {
    icon: <FaMapMarkerAlt className="text-4xl text-info" />,
    title: "Live Order Tracking",
    description:
      "Track your order in real-time from restaurant to your doorstep.",
  },
  {
    icon: <FaHeadset className="text-4xl text-success" />,
    title: "24/7 Support",
    description:
      "Our support team is available anytime to help you with your orders.",
  },
];

const OurServices = () => {
  return (
    <section className="py-12 px-4 bg-base-100 text-base-content" id="services">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Services</h2>
        <p className="mb-10 text-lg text-gray-500">
          We offer a variety of services to make your life easier and faster.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
