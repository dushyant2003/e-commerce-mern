import React from 'react'
import {useLocation} from 'react-router-dom'
const ViewProduct = () => {
    const {state} = useLocation()
    console.log(state)
  return (
    
    <>
    <div className="card-group" style={{width:"100%"}}>
        <div className="card">
          <img src={state.image} id= "imageResize" className="card-img-top " alt="..." />
          <div className="card-body">
            <h5 className="card-title">{state.name}</h5>
            <p className="card-text">
              {state.description}
            </p>
            <p className="card-text">{state.discount>0 ? <><span style={{color:"red",fontSize:20}}>-{state.discount} % </span><span style={{fontSize:25,fontWeight:"bold"}}>&nbsp;&nbsp;{(Number(state.price)-(Number(state.price)*(Number(state.discount)/100))).toFixed(2)} 
            </span></> :""} 
                      
            </p>
            <p className="card-text">M.R.P. <s>&#8377; {state.price}</s></p>
            
          </div>
          
        </div>
      </div>
    </>
  )
}

export default ViewProduct