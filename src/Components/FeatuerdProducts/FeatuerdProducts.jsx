import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Loading from './../Loading/Loading';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishListContext';




export default function FeatuerdProducts() {

  const [page, setPage] = useState(1);
  //  let[searchData , setSearchData] = useState(null)
 let {addToCart ,setCartNum} = useContext(CartContext)





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




 async function addProductToCart(id ) {

     let response = await addToCart(id);
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




  function getProducts(page) {

    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
    
  }

  
  let {isLoading ,data , isError , isFetched ,refetch } = useQuery('FeaturedProducts' ,() => getProducts(page),  )
 
  function reFetch(num) {
    refetch();
    setPage(num);
  }


  return (
    <>
      <h3 className=" p-3 my-5 bg-featuer">FeatuerdProduct</h3> 

      
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5 ">
          <div className="row gy-2 text-center" >
            {data?.data.data.map((product) => (
              <div key={product._id} className="col-lg-2 col-md-3 col-sm-4 ">
                <div className="product shadow-sm p-3">

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
              ></i>
                 <Link to = {`productDetails/${product._id}`}>

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
                    
                    onClick={() => addProductToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                  
                </div>
              
              </div>
            ))}
          </div>
        </div>
      )}


      <nav
      className="mt-3 nav d-flex align-items-center justify-content-center"
      aria-label="Page navigation">
      <ul className="pagination m-0">
        <li className="page-item mx-1">
          <button
            onClick={() => {
              reFetch(1);
            }}
            className="text-white bg-main btn border"
            disabled={page === 1}>
            1
          </button>
        </li>
        <li className="page-item mx-1">
          <button
            onClick={() => {
              reFetch(2);
            }}
            className="text-white bg-main btn border"
            disabled={page === 2}>
            2
          </button>
          
        </li>
      </ul>
    </nav>
    </>
  );
}
