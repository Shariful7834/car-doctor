import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderList = ({ order, handleDeleteOrder }) => {
  const { serviceName, price, _id, customer, service } = order;

  const [orderLists, setOrderLists] = useState({});
  const { img } = orderLists;
  useEffect(() => {
    fetch(`http://localhost:5000/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderLists(data))
      .catch((error) => console.error(error));
  }, [service]);

  return (
    <tr>
      <th>
        <label>
          <Link>
            <button
              onClick={() => handleDeleteOrder(_id)}
              className="btn btn-ghost"
            >
              X
            </button>
          </Link>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className=" rounded w-24 h-24">
              {orderLists?.img && <img src={orderLists?.img} alt="" />}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
          </div>
        </div>
      </td>
      <td>{serviceName}</td>
      <td>{price}</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};

export default OrderList;
