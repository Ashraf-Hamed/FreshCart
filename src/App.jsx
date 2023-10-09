import React from 'react'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Categories from './Components/Categoies/Categoies'
import Brands from './Components/Brands/Brands'

import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import {createBrowserRouter , createHashRouter, RouterProvider} from 'react-router-dom'
import Cart from './Components/Cart/Cart'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ForgetPassword from './Components/ForgetPass/ForgetPassword'
import RestCode from './Components/RestCode/RestCode'
import ResetPssword from './Components/ResetPassword/ResetPassword'
import SubCategory from './Components/SubCategories/SubCategories'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Porfile/Profile'
import WishList from './Components/WishList/WishList'
import Address from './Components/Address/Address'
import Orders from './Components/Orders/Orders'
 

export default function App() {


 let routes = createHashRouter([
  {path : '/' , element :<Layout/> , children : [
    {index : true , element :<ProtectedRoute> <Home/> </ProtectedRoute> },
    {path : 'products' , element : <ProtectedRoute> <Products/></ProtectedRoute>},
    {path : 'productDetails/:id' , element : <ProtectedRoute> <ProductDetails/></ProtectedRoute>},
    {path : 'categories' , element : <ProtectedRoute><Categories/></ProtectedRoute>},
    {path : 'categories/:id' , element : <ProtectedRoute><SubCategory/></ProtectedRoute>},
    {path : 'cart' , element : <ProtectedRoute> <Cart/></ProtectedRoute>},
    {path : 'brands' , element :<ProtectedRoute> <Brands/></ProtectedRoute> },
    {path : 'login' , element : <Login/> },
    {path : 'register' , element : <Register/> },
    {path : 'forgetpassword' , element : <ForgetPassword/> },
    {path : 'restCode' , element : <RestCode/> },
    {path : 'Resetpass' , element : <ResetPssword/> },
    {path : 'profile' , element : <Profile/> },
    {path : 'wishlist' , element : <WishList/> },
    {path : 'address' , element : <Address/> },
    {path : '/allorders' , element : <Orders/> },
    {path : '*' , element : <NotFound/>},
  ]}
 ])


  return (
  
    <>
      <RouterProvider router={routes}></RouterProvider>

      <Toaster/>

      </>

  )
}
