import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import * as animationData from "../Assets/loading.json";

const Checkout = () => {
  
  const { state } = useLocation();

  console.log(state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const u_id = useSelector((state) =>
    state.LoginReducer.login_data.u_id ? state.LoginReducer.login_data.u_id : ""
  );
  const u_name = useSelector((state) =>
    state.LoginReducer.login_data.name ? state.LoginReducer.login_data.name : ""
  );
  const u_email = useSelector((state) =>
    state.LoginReducer.login_data.email
      ? state.LoginReducer.login_data.email
      : ""
  );

  const getSubtotal = () => {
    var tmp = state;
    let total = 0;
    for (let i = 0; i < tmp.length; i++) {
      total += parseInt(
        (Number(tmp[i].p_data.price) -
          Number(tmp[i].p_data.price) *
            (Number(tmp[i].p_data.discount) / 100)) *
          tmp[i].quantity
      );
    }
    return total;
  };

  const handleCheckout1 = () => {
    let dt = {
      o_data: state,
      u_id: u_id,
      u_name: u_name,
      total: Number(getSubtotal() > 2000 ? getSubtotal() : getSubtotal() + 100),
      email:u_email
    };
    console.log(dt)
    setLoading(true)
    axios
      .post("/purchaseOrder", dt)
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false)
        navigate("/mycart");
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
    {loading==true ?
    <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={false}
              isPaused={false}
        />
  :
      <div
        className="container"
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-sm-4" style={{}}>
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title">
                Order Summary
              </h5>
              <hr />
              <p className="card-text">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Items</td>
                      <td>&#8377; {getSubtotal()}</td>
                    </tr>
                    <tr>
                      <td>Delivery</td>
                      <td>&#8377; {getSubtotal() > 2000 ? 0 : 100}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>
                        &#8377;{" "}
                        {getSubtotal() > 2000
                          ? getSubtotal()
                          : getSubtotal() + 100}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: 25,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        Order Total
                      </td>
                      <td
                        style={{
                          fontSize: 25,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        &#8377;{" "}
                        {getSubtotal() > 2000
                          ? getSubtotal()
                          : getSubtotal() + 100}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </p>
              <a
                className="btn btn-primary"
                onClick={()=>{handleCheckout1()}}
                style={{
                  backgroundColor: "#FFD814",
                  color: "black",
                  border: "none",
                  width: "100%",
                }}
              >
                Proceed to Buy
              </a>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default Checkout;
