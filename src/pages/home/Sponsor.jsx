import Marquee from "react-fast-marquee";

const sponsors = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Spotify_logo_with_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/YouTube_logo_2017.svg",
];

const Sponsor = () => {
  return (
    <section className="py-10 bg-base-200 w-11/12 mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Our Sponsors</h2>
        <p className="text-gray-500">Trusted by top brands</p>
      </div>

      <Marquee direction="left" speed={30} gradient={true} pauseOnHover>
        {sponsors.map((src, index) => (
          <div key={index} className="mx-10">
            <img
              src={src}
              alt={`Sponsor ${index + 1}`}
              className="h-10  transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Sponsor;
