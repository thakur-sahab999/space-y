import React, { useState, useEffect } from "react";
import BannerImage from "../assets/Images/banner.jpeg";
import RocketImage from "../assets/Images/rocket.jpg";
import FlightImage from "../assets/Images/flight.jpg";

const Banner = () => {
  const images = [BannerImage, RocketImage, FlightImage];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full   h-[220px] md:h-[400px] lg:h-[600px] ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="space-x"
          className={`absolute max-h-[580px]  z-0  left-0 w-full h-auto transition-opacity duration-500 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute hidden  lg bottom-5 pb-4 backdrop-blur-sm  bg-black bg-opacity-60  w-full lg:flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="w-16 h-16 z-30"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
        <p className="text-base italic font-semibold text-white">Scroll Down</p>
      </div>
    </div>
  );
};

export default Banner;
