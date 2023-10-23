import React from 'react'
import {Route,Routes} from "react-router-dom"
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import About from '../components/About'
import Contact from '../components/Contact'
import ViewProduct from '../components/ViewProduct'
import MyCart from '../components/MyCart'
import Checkout from '../components/Checkout'
import MyOrders from '../components/MyOrders'
function AllRoutes () {
    return (
        <>
        <Navbar />
      <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/home" element = {<Home />} />
      <Route path="/about" element = {<About />} />
      <Route path="/contact" element = {<Contact />} />
      <Route path="/mycart" element = {<MyCart />} />
      <Route path="/viewProduct/:id" element = {<ViewProduct />} />
      <Route path="/checkoutPage/:id" element = {<Checkout />} />
      <Route path="/myorders" element = {<MyOrders />} />
      <Route path="*" element = {<Home />} />
      </Routes>
        </>
    )
}

export default AllRoutes