import React from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Lottie from "react-lottie"
import * as animationData from "../Assets/loading.json"
import axios from "axios";

const Signup = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const navigate = useNavigate();
  const [loading,setLoading] = React.useState(false)
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  
  const handleInputs = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  };
  const PostData = async (e) => {
    e.preventDefault();
    // const { name, email, phone, work, password, cpassword } = user;
    const reg =     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!reg.test(user.email))
    {
      toast.error("Please enter a valid email")
    }
    else if(user.password.length < 6)
    {
      toast.error("Please enter at least 6 digit in Password")
    }
    else
    {
      setLoading(true)
    axios.post("/register",user).then((res)=>{
      

      
         toast.success(res.data.message)
         setLoading(false)
         navigate("/login");
      
     
      
      
    }).catch((err)=>{
      toast.error(err.response.data.error)
      setLoading(false)
    })
    }
    
    // const res = await fetch("/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     phone,
    //     work,
    //     password,
    //     cpassword,
    //   }),
    // });
    // const data = res.json();
    // if (res.status === 422 || !data) {
    //   toast.error("Invalid Registration")
    // } else {
    //   toast.success("User Registered Succesfully")
    //   navigate("/login");
    // }
    
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

  
    
      <div className="container m-3 p-3">
        <h1 className="p-39">Register Yourself</h1>
        <form method="POST">
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-user p-3"></i>
              </span>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputs}
                className="form-control"
                placeholder="Your Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-envelope p-3"></i>
              </span>
              <input
                type="email"
                name="email"
                onChange={handleInputs}
                value={user.email}
                className="form-control"
                placeholder="Your Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-phone p-3"></i>
              </span>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleInputs}
                className="form-control"
                placeholder="Mobile Number"
                aria-label="Mobile Number"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-user-tie p-3"></i>
              </span>
              <input
                type="text"
                name="work"
                value={user.work}
                onChange={handleInputs}
                className="form-control"
                placeholder="Profession"
                aria-label="Profession"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-lock p-3"></i>
              </span>
              <input
                type="Password"
                name="password"
                onChange={handleInputs}
                value={user.password}
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-lock p-3"></i>
              </span>
              <input
                type="password"
                name="cpassword"
                value={user.cpassword}
                onChange={handleInputs}
                className="form-control"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={PostData}
              >
                Register
              </button>
            </div>
            <div className="d-grid gap-2 p-3">
              <button
                className="btn btn-primary bg-light border-0"
                type="button"
              >
                <NavLink to="/login" className="nav-link text-dark">
                  Already Have An Account ? <span style={{color:"blue",fontStyle:"italic",fontWeight:"bold"}}>Login Here</span>
                </NavLink>
              </button>
            </div>
          </div>
        </form>
      </div>
}
    </>
  );
};

export default Signup;
