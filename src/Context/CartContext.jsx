import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

  let [cartNum, setCartNum] = useState(0);

  let [cartId, setCartId] = useState(null);

  let [CartDetails, setCartDetails] = useState(null);


  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId ,searchItem) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart?search=${searchItem}`,
        { productId: productId },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function GetLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
      .then((response) => response)
      .catch((error) => error);
  }


  
  async function displayCart() {
    let { data } = await GetLoggedUserCart();
    
    setCartDetails(data);
    setCartNum(data.numOfCartItems)
    setCartId(data?.data._id)
  }


  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateProductQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartCount(0);
        return response;
      })
      .catch((err) => err);
  }

  let OnlinePayment = async (id, shippingAddress) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://127.0.0.1:5173`,
        { shippingAddress },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  };



  useEffect(() => {
   
    displayCart()
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        GetLoggedUserCart,
        removeCartItem,
        updateProductQuantity,
        clearCart,
        cartNum,
        setCartNum,
        OnlinePayment,
        cartId,
         setCartId,
        displayCart,
        CartDetails,
         setCartDetails
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
