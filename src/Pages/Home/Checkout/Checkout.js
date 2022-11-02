import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const service = useLoaderData();
  const { _id, title, price, img } = service;
  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    const email = user?.email || "unregistered";
    const message = form.message.value;
    console.log(fullName, phone, email, message);

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: fullName,
      phone,
      email,
      message,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handlePlaceOrder}>
        <h1> You are about to order :{title} </h1>
        <h2>Price :{price}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-full "
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-full "
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="input input-bordered w-full "
            required
          />
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="Your Email"
            className="input input-bordered w-full "
          />
        </div>
        <textarea
          name="message"
          className="textarea textarea-info w-full h-60 border-2 mt-20"
          placeholder="Write your message"
        ></textarea>

        <button className="btn btn-active btn-accent mt-3 mb-20">
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default Checkout;
