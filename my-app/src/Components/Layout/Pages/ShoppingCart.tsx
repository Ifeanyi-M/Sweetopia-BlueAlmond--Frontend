import React from 'react'
import { CartPickUpDetails, CartSummary } from '../Page/Cart'
import { withAuth } from '../../../HOC';


const ShoppingCart = () => {
  return (
    <div className="row w-120" style={{ marginTop: "0px" }}>
        <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
            <CartSummary/>
        </div>
        <div className="col-lg-6 col-12 p-4 " >
           <CartPickUpDetails/>
        </div>
    </div>
  )
}

export default withAuth(ShoppingCart);