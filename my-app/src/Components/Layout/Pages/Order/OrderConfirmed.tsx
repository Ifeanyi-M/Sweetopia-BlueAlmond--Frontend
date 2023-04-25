import React from 'react'
import { useParams } from 'react-router-dom'
let confirmedImage = require("../../../../Assets/images/confirmed.jpg")


const OrderConfirmed = () => {

    const {id} = useParams()

  return (
      <div className="w-100 text-center d-flex justify-content-center align-items-center">
          <div>
              <i
                  style={{ fontSize: "7rem", color:"#FFBF00" }}
                  className="bi bi-check2-circle"
              ></i>
              <div className="pb-5">
                  <h2 style={{ color:"#FFBF00"}}>Order has been Confirmed!</h2>
                  <h5 className="mt-3 text-white">Your order ID: {id}</h5>
                  <p className='text-white'>We will soon start to cook the delicous food you ordered. </p>
                  <img
                      src={confirmedImage}
                      style={{ width: "40%", borderRadius: "30px" }}
                  ></img>
              </div>
          </div>
      </div>
  )
}

export default OrderConfirmed