import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from '../components/Login'
import Signup from '../components/Signup'
import Forgotpassword from '../components/Forgotpassword'

function AuthRoutes () {
    return (
        <>
      <Routes>
      <Route path="/" element = {<Login />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/signup" element = {<Signup />} />
      <Route path="/Forgotpassword" element = {<Forgotpassword />} />
      <Route path="*" element = {<Login />} />
      </Routes>
        </>
    )
}

export default AuthRoutes