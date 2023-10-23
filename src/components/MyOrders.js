import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import moment from 'moment'

const MyOrders = () => {
  const [data, setData] = useState([]);
  const u_id = useSelector((state) =>
    state.LoginReducer.login_data.u_id ? state.LoginReducer.login_data.u_id : ""
  );
  function getOrderHistory() {
    console.log(u_id)
    axios
      .get("/getAllOrders", { params: { u_id: u_id } })
      .then((res) => {
        setData(res.data.data);
        console.log(data)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    
  }
  useEffect(() => {
      getOrderHistory();
    }, []);
  return (
    <>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">SR#</th>
              <th scope="col">Order Number</th>
              <th scope="col">OrderId</th>
              <th scope="col">Status</th>
              <th scope="col">Amount</th>
              <th scope="col">Time</th>
              <th scope="col">View Order</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{el.ord_id}</td>
                <td>{el._id}</td>
                <td>{el.status == 0 ? "Pending" : "Delievered"}</td>
                <td>{el.total}</td>
                <td>{moment(new Date(el.time)).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td><button
                className="btn btn-success"
                
                style={{
                  width: "100%",
                }}
              >
                View Order
              </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrders;
