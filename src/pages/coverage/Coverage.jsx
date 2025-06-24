import React from "react";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const services = useLoaderData();
  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        We are available in 64 districts
      </h2>

      <CoverageMap services={services} />

      {/* You can add the searchable district list below here */}
    </section>
  );
};

export default Coverage;
