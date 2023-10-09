import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from './../../Context/CartContext';
import toast, { ToastBar } from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishListContext';




export default function Products() {

  let { setCartNum } = useContext(CartContext)
  


  let {addToCart} =  useContext(CartContext);
  const {
    addProductToWishlist,
    wishlistItem,
    deleteWishlistItem,
    getLoggedUserWishlist,
  } = useContext(wishlistContext);


  async function addToWishlist(id) {
    let response = await addProductToWishlist(id);
    if (response.data.status === "success") {
      toast.success("Product added successfully to your wishlist", {
        duration: 3500,
      });
    } else {
      toast.error("error in adding the product to your wishlist", {
        duration: 3500,
      });
    }
  }
  
  async function removewishlistItem(id) {
    let response = await deleteWishlistItem(id);
    if (response?.data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 3500,
      });
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 3500,
      });
    }
  }
  
  
  async function addProductsToCart(id) {

     let response = await addToCart(id)

   if(response.data.status === 'success') {
    toast.success('Product added successfully' , {
      duration: 2000,
      position: 'top-right',
      
    } )
    setCartNum(response.data.numOfCartItems)

   }
   else {

    toast.error('Error added successfully' , {
      duration: 2000,
      position: 'top-right',
      
    } )

   }

  }

   async function getProducts() {
     
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
   }


   let {isLoading ,data , isError , isFetched} = useQuery('products' ,getProducts )
   console.log(data?.data.data);
  

  return (
    <>

    <Helmet>
    <meta charSet="utf-8" />
    <title>Fresh Cart Products page</title>
   
  </Helmet>


      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5 ">
          <div className="row text-center" >
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-lg-2 col-md-3">
                <div className="product shadow-sm p-3 ">
 <i
                className={`fa-${
                  wishlistItem.includes(product.id) ? "solid" : "regular"
                } text-danger fa-heart opacity-75 cursor-pointer p-3 fs-3 position-absolute heartIcon`}
                onClick={() => {
                  if (!wishlistItem.includes(product.id)) {
                    addToWishlist(product.id);
                  } else {
                    removewishlistItem(product.id);
                  }
                }}
              ></i>                <Link to = {`/productDetails/${product.id}`}>
                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt={product.title}
                    />


                    <h3 className="h6 font-sm fw-bold text-main mt-2">
                      {product.category.name}
                    </h3>
                    <h3 className="h6 ">
                      {product.title.split(" ").splice(0, 2).join(" ")}
                    </h3>

                    <div className="d-flex justify-content-between my-2">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fa-solid fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                    </Link>
                  <button
                    
                    className="btn bg-main text-white w-100 btn-sm mt-2 "
                    onClick={() => addProductsToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
