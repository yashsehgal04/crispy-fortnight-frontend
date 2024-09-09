import React from "react";
import { Icon } from "@iconify/react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container mx-auto ">
        <div className="section-title">
          <h2 className="text-4xl font-bold mb-5 pt-10 ">OUR SERVICES</h2>
          <p className="text-gray-600">
            We bridge the gap between you and quality healthcare, ensuring seamless access to a world of wellness.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="service-card p-6 rounded-lg shadow-lg">
                  <div className="icon-container mb-4 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-[#477872] to-[#6fb0a8] w-32 h-32">
                    <Icon icon={d.icon} className="text-white text-4xl size-1/2" />
                  </div>
                  <h3 className="text-xl font-semibold">{d.name}</h3>
                  <p className="text-gray-700 mt-2">{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
