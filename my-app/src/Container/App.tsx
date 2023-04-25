import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../Components/Layout'
import { AccessDenied, AllOrders, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MenuItemDetails, MenuItemList, MenuItemUpsert, MyOrders, NotFound, OrderConfirmed, OrderDetails, Payment, Register, ShoppingCart } from '../Components/Layout/Pages'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../apis/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import { userModel } from '../Interfaces';
import jwtDecode from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';
import { MenuItemsList } from '../Components/Layout/Page/MenuItems';





const App = () => {

  const[skip, setSkip] = useState(true)

  const dispatch = useDispatch();

  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const { data, isLoading } = useGetShoppingCartQuery(userData.id /* , {
      skip: skip,} */
  ); 

  useEffect(() => {

    const localToken = localStorage.getItem("token");

    if(localToken){
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({
        fullName, id, email, role
      }));
    }

   
  }, [])

  useEffect(() => {
    if (!isLoading) {
      
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [data]);

 /*  useEffect(() =>{
    if(userData.id) setSkip(false);
  }, [userData]) */

  return (
    <>
      <BrowserRouter>
        <div>
          <Header />

        <div className='pb-5'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>}></Route>
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order/orderconfirmed/:id" element={<OrderConfirmed />} />
              <Route path="/order/myorders" element={<MyOrders />} />
              <Route path="/order/orderdetails/:id" element={<OrderDetails />} />
              <Route path="/order/allOrders" element={<AllOrders />} />
              <Route path="/menuItem/menuitemlist" element={<MenuItemList />} />
              <Route path="/menuItem/menuItemUpsert/:id" element={<MenuItemUpsert />} />
              <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />
              <Route path="/authentication" element={<AuthenticationTest />} />
              <Route path="/authorization" element={<AuthenticationTestAdmin />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
          <Footer />
        </div>
      </BrowserRouter>


    </>


  )
}

export default App