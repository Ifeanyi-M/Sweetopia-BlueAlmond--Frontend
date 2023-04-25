import React, { useState } from 'react'
import { orderSummaryProps } from './orderSummaryProps'
import { cartItemModel } from '../../../../Interfaces'
import { getStatusColor } from '../../../../Helper'
import { useNavigate } from 'react-router-dom'
import { SD_Roles, SD_Status } from '../../../../Utility/SD'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../Storage/Redux/store'
import { useUpdateOrderHeaderMutation } from '../../../../apis/orderApi'
import { MainLoader } from '../Common'

const OrderSummary = ({data, userInput} : orderSummaryProps) => {

    const badgeTypeColor = getStatusColor(data.status!)
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.userAuthStore)

    const[loading, setIsLoading] = useState(false)

    const [updateOrderHeader] = useUpdateOrderHeaderMutation();

    const nextStatus: any = data.status! === SD_Status.CONFIRMED?
    {color: "info", value: SD_Status.BEING_COOKED} : data.status ! === SD_Status.BEING_COOKED?
            { color: "warning", value: SD_Status.READY_FOR_PICKUP } : data.status! === SD_Status.READY_FOR_PICKUP && 
            { color: "success", value: SD_Status.COMPLETED }


    const handleNextStatus = async () => {
        setIsLoading(true)
        await updateOrderHeader({
            orderHeaderId: data.id,
            status: nextStatus.value,
        });

        setIsLoading(false)
    }; 
    
    const handleCancel = async () =>
    {
        setIsLoading(true)
        await updateOrderHeader({
            orderHeaderId: data.id,
            status:SD_Status.CANCELLED,
        });
        setIsLoading(false)

    }  


  return (
      <div>
          {loading && <MainLoader/>}
          {!loading && (
            <>
                  <div className='d-flex justify-content-between align-items-center' >
                      <h3  style={{ color: "#FFBF00" }}>Order Summary</h3>
                      <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
                          {data.status}
                      </span>
                  </div>

                  <div className="mt-3" style={{ background: "#FFBF00", border: "5px solid #FF4433", borderRadius: "10px" }}>
                      <div className="border py-3 px-2">Name : {userInput.name}</div>
                      <div className="border py-3 px-2">Email : {userInput.email}</div>
                      <div className="border py-3 px-2">Phone : {userInput.phoneNumber}</div>
                      <div className="border py-3 px-2">
                          <h4 style={{ color:"#FF4433"}}>Menu Items</h4>
                          <div className="p-3">
                              {data.cartItems?.map((cartItem: cartItemModel, index: number) =>
                              {
                                  return (
                                      <div className="d-flex" key={index}>
                                          <div className="d-flex w-100 justify-content-between">
                                              <p>{cartItem.menuItem?.name}</p>
                                              <p>NGN {cartItem.menuItem?.price} x {cartItem.quantity}=</p>
                                          </div>
                                          <p style={{ width: "70px", textAlign: "right" }}>
                                              NGN {(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}
                                          </p>
                                      </div>

                                  )
                              })}



                              <hr />
                              <h4 className="text-danger" style={{ textAlign: "right" }}>
                                  NGN {data.cartTotal?.toFixed(2)}
                              </h4>
                          </div>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                      <button className='btn btn-secondary' onClick={() => navigate(-1)}>
                          Back to Orders
                      </button>

                      {userData.role == SD_Roles.ADMIN && (
                          <div className='d-flex'>
                            {data.status! !== SD_Status.CANCELLED &&
                            data.status! !== SD_Status.COMPLETED && (
                                  <button className='btn btn-danger mx-2' onClick={handleCancel}> Cancel</button>
                            )}
                              
                              <button className={`btn btn-${nextStatus.color}`} onClick={handleNextStatus}>{nextStatus.value}</button>
                          </div>
                      )}
                  </div>
            
            </>
          )}
          
      </div>
  )
}

export default OrderSummary