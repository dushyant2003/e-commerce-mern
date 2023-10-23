import { useState } from "react"
import AuthRoutes from './AuthRoutes'
import AllRoutes from './AllRoutes'
import Home from '../components/Home'
import {  useSelector } from "react-redux"
function SwitchRouting() {
    const auth = useSelector((state)=>state.LoginReducer.login_status?state.LoginReducer.login_status:false)
    return (
        <>
        {auth ? <AllRoutes /> : <AuthRoutes />}
        
        </>
    )
}
export default SwitchRouting