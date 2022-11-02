import React from "react";
import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="mb-5">
      <div className="text-center">
        <p className=" text-xl font-bold text-orange-600">Service</p>
        <h2 className="text-5xl font-bold my-5">Our Service Area</h2>
        <p className="w-1/2 mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, amet
          dolores! Sed molestias dolore recusandae veniam
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Service;
