import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {

 
  let {
    GetLoggedUserCart,
    setCartNum,
    removeCartItem,
    updateProductQuantity,
    clearCart ,
    displayCart,
    CartDetails,
    setCartDetails
    
    
  } = useContext(CartContext);

  

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartDetails(data);
    if (data.status === "success") {
      toast.success("Item removed successfully", {
        duration: 2000,
        position: "top-right",
      });
      setCartNum(data.numOfCartItems);
    } else {
      toast.error("Removed  Failed", {
        duration: 2000,
        position: "top-right",
      });
    }
    console.log(data);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    if (data?.status === "success") {
      setCartDetails(data);
      if (count <= 0) {
        removeItem(id);
      }
    }
    
  }

  async function clearCartItems() {
    let { data } = await clearCart();
    if (data?.message === "success") {
      setCartDetails(null);

      toast.success("cart is cleared successfully");
    } else {
      toast.error("error in clearing the cart, try again");
    }
  }


  useEffect(() => {
    displayCart();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Cart page </title>
      </Helmet>

      {CartDetails ? (
        <div className="w-75 cart bg-main-light mx-auto p-4 my-2">
          <h3 className="fw-bold">
            Shopping Cart <i className="fa-solid fa-cart-plus"></i>
          </h3>
          <h4 className="h6 py-2 text-main fw-bolder">
            Cart Item : {CartDetails.numOfCartItems}
          </h4>
          <h4 className="h6 text-main fw-bolder mb-4">
            Total Cart Price : {CartDetails.data.totalCartPrice} EGP
          </h4>

          {CartDetails.data.products.map((product) => (
            <div
              key={product.product.id}
              className="row border-bottom py-2 mb-2 "
            >
              <div className="col-lg-1 col-md-2 col-sm-3 ">
                <img
                  src={product.product.imageCover}
                  className="w-100 figure-img img-thumbnail "
                  alt=""
                />
              </div>
              <div className="col-lg-11 col-md-10 col-sm-9">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h6 Cardtitle text-main">
                      {product.product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <h3 className="h6 CardPrice text-main">
                      Price : {product.price} EGP
                    </h3>
                  </div>

                  <div className="cart-btn">
                    <button
                      onClick={() =>
                        updateCount(product.product.id, product.count + 1)
                      }
                      className="btn btn-outline-success fw-bold"
                    >
                      +
                    </button>
                    <span className="mx-2 fs-5 ">{product.count}</span>
                    <button
                      onClick={() =>
                        updateCount(product.product.id, product.count - 1)
                      }
                      className="btn btn-outline-danger fw-bold"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="removeItem">
                  <button
                    onClick={() => removeItem(product.product.id)}
                    className="btn btn-outline-danger"
                  >
                    {" "}
                    <i className="fas fa-trash-can font-sm  me-2"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="control d-flex justify-content-between align-items-center text-white">
            <button
              onClick={(clearCartItems)}
              className="btn btn-danger my-2  "
            >
              {" "}
              <i className="fas fa-trash-can me-2"></i> Remove All
            </button>
            <Link to={"/address"} className="btn bg-main my-2 text-white">
              <i className="fa-solid fa-credit-card me-2"></i>Online Payment{" "}
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-main-light p-4 text-main mx-auto">
          <h1>Cart empty</h1>
        </div>
      )}
    </>
  );
}
