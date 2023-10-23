import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch,useSelector } from 'react-redux'
import axios from "axios"
import Lottie from "react-lottie"
import * as animationData from "../Assets/loading.json"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading,setLoading] = React.useState(false)
  const [values,setValues] = React.useState({
    email:"",
    password:""
  })
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const handleInput = (e) =>{
  setValues({...values,[e.target.name]:e.target.value})
}


  const loginUser =  (e) => {

    const reg =     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    
    if(!reg.test(values.email))
    {
      toast.error("Please enter a valid email")
    }
    else if(values.password.length < 6)
    {
      toast.error("Please enter at least 6 digit in Password")
    }
    else
    {
      setLoading(true)
      axios.post("/login",values)
      .then((res)=>{
        if(res.data.status === 200)
        {
          toast.success("Login Successfully")
          dispatch({type:"LOGIN_SUCCESS",data:res.data.data})
          setLoading(false)
        }
        else
        {
          dispatch({type:"LOGIN_FALIED",login_data:null})
          setLoading(false)
        }
      })
      .catch((err)=>{
        dispatch({type:"LOGIN_FALIED",login_error:err.response.data.message})
        setLoading(false)
      })
    }
  }

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
        <h1 className="p-39">Login</h1>
        <form method="POST">
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-envelope p-3"></i>
              </span>
              <input
                type="email"
                name="email"
                
                onChange={handleInput}
                value={values.email}
                className="form-control"
                placeholder="Your Email"
                aria-label="Email"
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
                
                onChange={handleInput}
                value={values.password}
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="d-grid gap-2 p-3">
              <button className="btn btn-primary" type="button" onClick={loginUser}>
                Sign In
              </button>
            </div>
            <div className="d-grid gap-2 p-3">
              <button
                className="btn btn-primary bg-light border-0"
                type="button"
              >
                <NavLink to="/signup" className="nav-link text-dark">
                  Create An Account
                </NavLink>
              </button>
              <button
                className="btn btn-primary bg-light border-0"
                type="button"
              >
                <NavLink to="/ForgotPassword" className="nav-link text-dark">
                  Forgot Password
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

export default Login;
