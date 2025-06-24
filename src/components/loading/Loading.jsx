import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <RingLoader color="#68f200" />
    </div>
  );
};

export default Loading;
