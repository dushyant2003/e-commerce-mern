import React, { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [cartData,setCartData] = useState([])
  const u_id = useSelector((state)=>state.LoginReducer.login_data.u_id)

  const modifyData = () => {
    let p_data = data;
    let c_data = cartData;
    for(let i=0;i<p_data.length;i++)
    {
      for(let j=0;j<c_data.length;j++)
      {
        if(p_data[i]._id == c_data[j].p_id)
        {
          p_data[i]['disable'] = true
        }
      }
    }
    return p_data
  }

  const navigate = useNavigate()
  function getAllProducts() {
    fetch("/getAllProducts")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.data)
      });
  }
  function getMyCart() {
    axios.get("/getMyCart",{params:{u_id:u_id}})
    .then((result)=>{
      
      setCartData(result.data.data)
      dispatch({type:"Cart_Count",data:result.data.count})
    })
  }
  function handleViewMore(el) {
    
    navigate('/viewProduct/' + el._id,{state:el})
  }
  useEffect(()=>{
    getAllProducts()
    getMyCart()
  },[])

  const addToCart = (el) =>{
    let data = {
      p_id:el._id,
      u_id:u_id,
    }
    axios.post("/addToCart",data)
    .then((res)=>{
      toast.success(res.data.message)
      getMyCart()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }

  return (
    <>
    {modifyData(data).map((el,i)=>(

    
      <div className="card-group" style={{display:"inline-block",padding:20,margin:10}}>
        <div className="card">
          <img src={el.image} id= "imageResize" className="card-img-top " alt="..." />
          <div className="card-body">
            <h5 className="card-title">{el.name}</h5>
            <p className="card-text">
              {el.description}
            </p>
            <p className="card-text">{el.discount>0 ? <><span style={{color:"red",fontSize:20}}>-{el.discount} % </span><span style={{fontSize:25,fontWeight:"bold"}}>&nbsp;&nbsp;{(Number(el.price)-(Number(el.price)*(Number(el.discount)/100))).toFixed(2)} 
            </span></> :""} 
                      
            </p>
            <p className="card-text">M.R.P. <s>&#8377; {el.price}</s></p>
            
          </div>
          <div className="card-footer">
          <a onClick={()=>handleViewMore(el)} class="btn btn-primary">View More</a>
          </div><div className="card-footer">
          {el.disable == true?
          
          <button style={{}} disabled={true} class="btn btn-success">Already Added</button>
          
        :
    
          <a style={{}} onClick={()=>addToCart(el)} class="btn btn-success">Add to Cart</a>
          
        }</div>
          
        </div>
      </div>
      ))}
    </>
  );
};

export default Home;



