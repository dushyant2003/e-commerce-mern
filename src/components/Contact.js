import React from 'react'
import {useState} from "react"
import { useDispatch,useSelector } from 'react-redux'

const Contact = () => {
  const dispatch = useDispatch()
  var count = useSelector((state)=>state.CountReducer.count ? state.CountReducer.count : 0)

  const incre = () =>{
    dispatch({type:"INCRE",count :count+1})
  }
  const decre = () =>{
    dispatch({type:"DECRE",count:count-1})
  }
  return (
    <>
    <h1>Value of count is {count}</h1>
    <button onClick={incre}>+</button>
    <br/>
    <button onClick={decre}>-</button>
    </>
  )
}

export default Contact