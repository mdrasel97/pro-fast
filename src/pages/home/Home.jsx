import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import Sponsor from "./Sponsor";
import Faq from "./Faq";
import CustomerSatisfaction from "./CustomerSatisfaction";
import ReviewSection from "./ReviewSection";
import BenefitsSection from "./BenefitsSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <OurServices />
      <Sponsor />

      <BenefitsSection />
      <Faq />
      <CustomerSatisfaction />
      <ReviewSection />
    </div>
  );
};

export default Home;
