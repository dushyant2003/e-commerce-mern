import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Lottie from "react-lottie"
import * as animationData from "../Assets/cartEmpty.json"
import { useNavigate,Link } from "react-router-dom";
const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const u_id = useSelector((state) => state.LoginReducer.login_data.u_id);
  const [cartData, setCartData] = useState([]);
  function getMyCart() {
    axios
      .get("/getDetailedCartData", { params: { u_id: u_id } })
      .then((result) => {
        setCartData(result.data.data);
      });
  }
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  function getSubtotal() {
    var tmp = cartData;
    let total = 0;
    for (let i = 0; i < tmp.length; i++) {
      total += parseInt(
        (Number(tmp[i].p_data.price) -
          Number(tmp[i].p_data.price) * (Number(tmp[i].p_data.discount) / 100))*tmp[i].quantity
      );
    }
    return total;
  }
  const handleQuanIncre = (x,y) =>{
    let dy = {
      cd_id:x,
      quan:Number(y)+1
    }
    axios.post("/handleQuantity",dy)
    .then((res)=>{
      toast.success(res.data.message)
      getMyCart()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }
  const handleQuanDecre = (x,y) =>{
    let dy = {
      cd_id:x,
      quan:Number(y)-1
    }
    axios.post("/handleQuantity",dy)
    .then((res)=>{
      toast.success(res.data.message)
      getMyCart()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  } 

  function handleCheckout (){
    var rd = Math.floor(Math.random()*23213144)
    navigate('/checkoutPage/'+rd,{state:cartData})
    
  }

  useEffect(() => {
    getMyCart();
  }, []);
  return (
    <>
    {cartData.length>0 ?

    
      <div class="container">
        <div class="row" style={{ padding: 10 }}>
          <div class="col-sm-8" style={{}}>
            {cartData.map((el, i) => (
              <div class="row" style={{ padding: 5 }}>
                <div class="col-sm-4" style={{}}>
                  <img
                    src={el.p_data.image}
                    id="imageResize"
                    className="card-img-top "
                    alt="..."
                  />
                </div>

                <div class="col-sm-8" style={{}}>
                  <h5 className="card-title">{el.p_data.name}</h5>
                  <p className="card-text">{el.p_data.description}</p>
                  <p className="card-text">
                    {el.p_data.discount > 0 ? (
                      <>
                        <span style={{ color: "red", fontSize: 20 }}>
                          -{el.p_data.discount} %{" "}
                        </span>
                        <span style={{ fontSize: 25, fontWeight: "bold" }}>
                          &nbsp;&nbsp;
                          {(
                            Number(el.p_data.price) -
                            Number(el.p_data.price) *
                              (Number(el.p_data.discount) / 100)
                          ).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="card-text">
                    M.R.P. <s>&#8377; {el.p_data.price}</s>
                  </p>
                  <div class="container" style={{padding:10}}>
                    <div class="row">
                      <div class="col-sm-5" style={{textAlign:"right"}}>
                        <button className="btn btn-danger" style={{fontSize:15,fontWeight:"bold"}} onClick={()=>{handleQuanDecre(el._id,el.quantity)}}>-</button>
                      </div>
                      <div class="col-sm-2" style={{fontSize:20,fontWeight:"bold",textAlign:"center"}}>
                      {el.quantity}
                      </div>
                      <div class="col-sm-5">
                        <button className="btn btn-success" style={{fontSize:15,fontWeight:"bold"}} onClick={()=>{handleQuanIncre(el._id,el.quantity)}}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div class="col-sm-4" style={{}}>
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title">Subtotal : {getSubtotal()}</h5>
                <p className="card-text">Get Free Delivery on Orders above &#8377; 2000</p>
                <a
                  
                  className="btn btn-primary"
                  onClick={()=>{handleCheckout()}}
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
      </div>
      :
      <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={false}
              isPaused={false}
        />
    }
    </>
  );
};

export default MyCart;
