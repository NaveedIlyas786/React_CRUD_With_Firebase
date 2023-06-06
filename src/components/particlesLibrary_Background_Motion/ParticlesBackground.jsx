import React from "react";
import { Particles } from "react-tsparticles";

const ParticlesBackground = () => {
  const particleOptions = {
    background: {
      color: {
        value: "#000000", // Set the desired background color
      },
    },
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 3,
      },
      move: {
        speed: 2,
      },
    },
  };

  return (
    <Particles id="tsparticles" options={particleOptions} />
  );
};

export default ParticlesBackground;
