import React from 'react'

const CartReducer = (state,action) => {
  if(typeof state == 'undefined')
  {
    return {
        cart_count:0
    }
  }
  switch(action.type)
  {
    case 'Cart_Count':
        return {
            ...state,
            cart_count:action.data
        }
    
    default:
        return state
  }
}

export default CartReducer