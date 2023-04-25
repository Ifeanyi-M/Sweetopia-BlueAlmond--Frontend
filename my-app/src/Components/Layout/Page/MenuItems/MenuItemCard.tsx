import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../../../../apis/shoppingCartApi';
import { toastNotify } from '../../../../Helper';
import { apiResponse, menuItemModel, userModel } from '../../../../Interfaces'
import { MiniLoader } from '../Common';
import { RootState } from '../../../../Storage/Redux/store';
import { useSelector } from 'react-redux';

interface Props{
    menuItem: menuItemModel;
}

const MenuItemCard = (prop:Props) => {
  const navigate = useNavigate()

  const[isAddingToCart, setIsAddingToCart] =  useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData : userModel= useSelector((state: RootState) => state.userAuthStore);

  const handleAddToCart = async (menuItemId: number) => {
    if(!userData.id){
      navigate("/login")
      return;
    }
    setIsAddingToCart(true);

   const response : apiResponse = await updateShoppingCart({
      menuItemId:menuItemId,
      updateQuantityBy:1,
     userId: userData.id,
    });


    if(response.data && response.data.isSuccess){
      toastNotify("Item has been added to cart succesfully")
    }

    

    setIsAddingToCart(false);
  }

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 5px 7px 0 rgb(4 4 4 / 75%)", border: "5px solid #FF4433" , borderRadius:"10px" }}
      >
        <div className="card-body pt-2" style={{ background:"#FFBF00"}}>
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${prop.menuItem.id}`}>
            <img
              src={prop.menuItem.image}
              style={{ borderRadius: "50%" }}
              alt=""
              className="w-100 mt-5 image-box"
            />
            </Link>
          </div>

          {prop.menuItem.specialTag && prop.menuItem.specialTag.length > 0 && (
            <i
            className="bi bi-star"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
              background:"#FF4433",
              color:"white"
            }}
          >
            &nbsp; {prop.menuItem.specialTag}
          </i>
          )}

            {isAddingToCart?(
            <div style={{
              position:"absolute",
              top:"15px",
              right:"15px",

            }}>
              <MiniLoader/>
              
            </div>
            ) : (
              <i
              className="bi bi-cart-plus"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
                color:"white",
                background:" #FF4433"
              }}
  
              onClick={()=>handleAddToCart(prop.menuItem.id)}
            ></i>
            )}
          

          

          <div className="text-center">
            <p className="fs-4" >
              <Link to={`/menuItemDetails/${prop.menuItem.id}`} style={{ textDecoration: "none", color:"#D22B2B" }}>
              {prop.menuItem.name}
              </Link>
              </p>
            <p className="badge " style={{ fontSize: "12px", background:"#CC5500"}}>
              {prop.menuItem.category}
            </p>
          </div>
          <p className="card-text " style={{ textAlign: "center", color:"black" }}>
            {prop.menuItem.description}
          </p>
          <div className="row text-center " style={{ color:"#FF4433"}}>
            <h4>NGN{prop.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard