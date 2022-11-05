import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import OrderList from "./OrderList";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(
      `https://genius-car-server-gules.vercel.app/orders?email=${user?.email}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      })
      .then((data) => setOrders(data));
  }, [user?.email]);

  const handleDeleteOrder = (id) => {
    const proceed = window.confirm("Do you want to cancel your order?");
    if (proceed) {
      fetch(`https://genius-car-server-gules.vercel.app/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Order deleted successfully");
            const remaining = orders.filter((order) => order._id !== id);
            setOrders(remaining);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdate = (id) => {
    fetch(`https://genius-car-server-gules.vercel.app/orders/${id}`, {
      method: "PATCH",
      Headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // const proceed = window.confirm('Product Updated Successfully')
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approving = orders.find((odr) => odr._id === id);
          approving.status = "Approved";
          const newOrders = [approving, ...remaining];
          setOrders(newOrders);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">You have{orders.length} orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderList
                key={order._id}
                order={order}
                handleDeleteOrder={handleDeleteOrder}
                handleUpdate={handleUpdate}
              ></OrderList>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
