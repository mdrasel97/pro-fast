import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Md. Asif",
    role: "Customer",
    comment:
      "Profast has been a game-changer for me. Fast delivery, great support, and always on time!",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Sadia Rahman",
    role: "Merchant",
    comment:
      "Their merchant system is smooth and reliable. I’ve grown my business using Profast’s services.",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Tanvir Ahmed",
    role: "Rider",
    comment:
      "I earn regularly and manage my time freely thanks to Profast's flexible courier model.",
    img: "https://i.pravatar.cc/150?img=3",
  },
];

const ReviewSection = () => {
  return (
    <section className="py-12 bg-base-100 text-base-content" id="reviews">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <p className="text-gray-500">
          Real feedback from customers, merchants, and couriers
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-200 shadow-xl p-6 text-center">
                <div className="avatar mb-4 mx-auto">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={review.img} alt={review.name} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{review.role}</p>
                <p className="text-gray-700 italic">"{review.comment}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
