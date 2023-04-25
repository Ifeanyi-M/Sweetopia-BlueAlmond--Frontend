import React from 'react'
import {useParams} from 'react-router-dom';
import { useGetMenuItemByIdQuery } from '../../../apis/menuItemApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUpdateShoppingCartMutation } from '../../../apis/shoppingCartApi';
import { MainLoader, MiniLoader } from '../Page/Common';
import { apiResponse, userModel } from '../../../Interfaces';
import { toastNotify } from '../../../Helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';


//USER ID - 80b162ea-a063-4e71-b1f8-d7cb34d0adea

const MenuItemDetails = () => {

  const {menuItemId} = useParams();
  const {data, isLoading} = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const[quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleQuantity = (counter : number) => {
    let newQuantity = quantity + counter
    if(newQuantity == 0){
       newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  }

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id)
    {
      navigate("/login")
      return;
    }
    setIsAddingToCart(true);

   const response : apiResponse = await updateShoppingCart({
      menuItemId:menuItemId,
      updateQuantityBy:quantity,
      userId:userData.id,
    });

    if(response.data && response.data.isSuccess){
      toastNotify("Item has been successfully added to cart")
    }

    



    setIsAddingToCart(false);
  }

  return (
    <div>
      <div className="container pt-4 pt-md-5 ">
      {!isLoading ? (<>
        <div className="row">
      <div className="col-7">
              <h2 style={{ color: "#FFBF00", marginBottom:"30px"}}>{data.result?.name}</h2>
        <span>
          <span
            className="badge pt-2  "
                  style={{ height: "40px", fontSize: "20px", background: "#FF4433"}}
          >
            {data.result?.category}
          </span>
        </span>
        
        <span>
          <span
            className="badge  pt-2 "
            style={{ height: "40px", fontSize: "20px" , marginLeft:"50px", background:"#eaf250", color:"black" }}
          >
             {data.result?.specialTag}
          </span>
        </span>
        <p style={{ fontSize: "20px", color:"white", marginTop:"20px", marginBottom:"40px" }} className="pt-2 ">
          {data.result?.description}
        </p>
        <span style={{color:"gold", marginTop:"40px"}}className="h3">NGN{data.result?.price}</span> &nbsp;&nbsp;&nbsp;
        <span
          className="pb-2  p-3"
          style={{ border: "5px solid #333", borderRadius: "30px" , color: "#3248a8"}}
        >
          <i onClick={() =>{
            handleQuantity(-1);
          }}
            className="bi bi-dash p-1"
                  style={{ fontSize: "33px", cursor: "pointer", color:"#FF4433"}}
          ></i>
          <span className="h3 mt-3 px-3" style={{color:"gold"}}>{quantity}</span>
          <i onClick={() =>{
            handleQuantity(+1);
          }}
            className="bi bi-plus p-1 text-success"
            style={{ fontSize: "33px", cursor: "pointer" }}
          ></i>
        </span>
        <div className="row pt-4">
          <div className="col-5">
            {isAddingToCart ? (
            <button disabled className='btn btn-secondary form-control'>
              <MiniLoader/>
            </button>) : (
               <button className="btn btn-success form-control" style={{ marginTop: "60px"}} onClick={() => handleAddToCart(data.result?.id)}>
               Add to Cart
             </button>
            )}
           
          </div>

          <div className="col-5 ">
            <button className="btn form-control"
            onClick={() => navigate(-1)}
                    style={{ marginTop: "60px", background:"#FF4433"}}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <div className="col-5">
        <img
          src={data.result.image}
          width="100%"
          style={{ borderRadius: "50%" }}
          alt="No content"
        ></img>
      </div>
    </div>
      </>

      ) : (
      <div className="d-flex justify-content-center"
      style={{width : "100%"}}
      >

          <MainLoader/>
      </div>

      )
      
    }


    
  </div>
    </div>
    
  )
}

export default MenuItemDetails