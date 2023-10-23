import React from 'react'
import { useState } from "react"
import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from "react-toastify"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Lottie from "react-lottie"
import * as animationData from "../Assets/loading.json"

const Forgotpassword = () => {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        email:"",
        showForm2:false,
        loading:false,
        otp:"",
        new_pass:""
    })
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  
    function handleInput(e) {
        setValues({...values,[e.target.name]:e.target.value})
    }
    function handleSubmit (e) {

        e.preventDefault()
        const reg =     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    
        if(!reg.test(values.email))
        {
        toast.error("Please enter a valid email")
        }
        else {
            setValues({...values,['loading']:true})
            
            
            axios.post("/sendOTP",{"email":values.email})
            .then((res)=>{
                setValues({...values,['loading']:false,['showForm2']:true})
                toast.success(res.data.message)

            }).catch((err)=>{
                toast.error(err.response.data.message)
                setValues({...values,['loading']:false})
                console.log(values.email)
            })
        }
        
    }
    function handleOTP () {
        setValues({...values,['loading']:true})
        axios.post("/changePassword",values)
        .then((res)=>{
            toast.success(res.data.message)
            setValues({...values,['loading']:false,['showForm2']:false})
            navigate("/login")

        }).catch((err)=>{
            toast.error(err.response.data.message)
            setValues({...values,['loading']:false})
        })
    }
  return (
    <>
    {values.loading==true ?
      <>
      <Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}
          />
      </>
    :
    <>
    
    {values.showForm2 == false ?
    <div className="container m-3 p-3">
    <h1 className="p-39">Reset Your Password</h1>
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
        <div className="d-grid gap-2 p-3">
          <button className="btn btn-primary" type="button" onClick={handleSubmit}>
            RESET
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
        </div>
      </div>
    </form>
  </div>
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
                type="number"
                name="otp"
                onChange={handleInput}
                value={values.otp}
                className="form-control"
                placeholder="Enter OTP"
                aria-label="OTP"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-lock p-3"></i>
              </span>
              <input
                type="Password"
                name="new_pass"
                onChange={handleInput}
                value={values.new_pass}
                className="form-control"
                placeholder="Enter new password"
                aria-label="new_pass"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="d-grid gap-2 p-3">
              <button className="btn btn-primary" type="button" onClick={handleOTP}>
                Change Password
              </button>
            </div>
            <div className="d-grid gap-2 p-3">
              <button
                className="btn btn-primary bg-light border-0"
                type="button"
              >
              </button>
            </div>
          </div>
        </form>
      </div>
}

    
    </>
}
</>
  )
}

export default Forgotpassword
