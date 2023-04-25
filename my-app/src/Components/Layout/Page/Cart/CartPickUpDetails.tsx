import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { inputHelper } from '../../../../Helper'
import { apiResponse, cartItemModel } from '../../../../Interfaces'
import { RootState } from '../../../../Storage/Redux/store'
import { MiniLoader } from '../Common'
import { useInitiatePaymentMutation } from '../../../../apis/paymentApi'
import { useNavigate } from 'react-router-dom'

const CartPickUpDetails = () => {

    const [loading, setLoading] = useState(false);

    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    )

    const userData = useSelector((state: RootState) => state.userAuthStore)  

    let grandTotal = 0;
    let totalItems = 0;

    const initialUserData = {
        name: userData.fullName,
        email: userData.email,
        phoneNumber: ""
    }

    shoppingCartFromStore?.map((cartItem:cartItemModel)=> {
        totalItems += cartItem.quantity??0;
        grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
        return null;
    })

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState(initialUserData)

    const [initiatePayment] = useInitiatePaymentMutation();

    useEffect(() => {
      setUserInput({
        name: userData.fullName,
        email: userData.email,
        phoneNumber: ""
      });
    
      
    }, [userData])
    

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    }


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const {data} : apiResponse = await initiatePayment(userData.id)
        /* const orderSummary = {grandTotal, totalItems}; */
       
        navigate("/payment", {
            state : {apiResult: data?.result, userInput}
        })
    }

  return (
    <div>
          <h4 style={{ marginBottom: "37px", color:"#FF4433", fontWeight:"800"}} className="text-center">
              Pickup Details
          </h4>
          <div className="pb-5 pt-3" style={{ boxShadow: "0 5px 7px 0 rgb(5 5 5 / 50%)", border: "5px solid #FFBF00", borderRadius: "10px", background: "#FF4433" }}>
              
              
              <form onSubmit={handleSubmit} className="col-10 mx-auto" style={{ background:"#FF4433"}}>
                  <div className="form-group mt-3" style={{ color: "#FDDA0D" }}>
                      Pickup Name
                      <input
                          type="text"
                          value={userInput.name}
                          className="form-control"
                          placeholder="name..."
                          name="name"
                          onChange={handleUserInput}
                          required
                      />
                  </div>
                  <div className="form-group mt-3" style={{ color: "#FDDA0D" }}>
                      Pickup Email
                      <input
                          type="email"
                          value = {userInput.email}
                          className="form-control"
                          placeholder="email..."
                          name="email"
                          onChange={handleUserInput}
                          required
                      />
                  </div>

                  <div className="form-group mt-3" style={{ color: "#FDDA0D" }}>
                      Pickup Phone Number
                      <input
                          type="number"
                          value= {userInput.phoneNumber}
                          className="form-control"
                          placeholder="phone number..."
                          name="phoneNumber"
                          onChange={handleUserInput}
                          required
                      />
                  </div>
                  <div className="form-group mt-5">
                      <div className="card p-3 " style={{ background: "ghostwhite" }}>
                          <h5 >Grand Total : NGN {grandTotal.toFixed(2)}</h5>
                          <h5 >No of items : {totalItems}</h5>
                      </div>
                  </div>
                  <button
                      type="submit"
                      className="btn btn-lg form-control mt-5"
                      disabled={loading}
                      style={{ background:"#FDDA0D"}}
                  >
                      {loading ? <MiniLoader /> : "Looks Good?  Place Your Order!" }
                      
                  </button>
              </form>
          </div>
    </div>
      
  )
}

export default CartPickUpDetails