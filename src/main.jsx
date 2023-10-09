import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./index.css";


import UserTokenContextProvider from "./Context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/CartContext.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";


const queryClient = new QueryClient() ;


ReactDOM.createRoot(document.getElementById("root")).render(
 

  <QueryClientProvider client={queryClient}>
    <WishListContextProvider>
      <CartContextProvider>
        <UserTokenContextProvider>
          
          <App />
        </UserTokenContextProvider>
      </CartContextProvider>
    </WishListContextProvider>
 
  
  </QueryClientProvider>

  
);
