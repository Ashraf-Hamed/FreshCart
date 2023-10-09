import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useContext, useEffect } from 'react';
import { UserTokenContext } from '../../Context/UserContext';
import { Offline, Online } from "react-detect-offline";
import Order from '../Orders/Orders'

export default function Layout() {

  let {setUserToken} = useContext(UserTokenContext);


  useEffect(() => {
    if(localStorage.getItem('userToken') !== null ) {
      setUserToken(localStorage.getItem('userToken'));
    }
  } , [])
  

  return (
    <>

    <div >
    <Offline> 
      <div className="network">
       <i className='fas fa-wifi mx-3'></i>
       Your are offline (surprise!)
      </div>
   </Offline>
    </div>
      
    <div className="parent">

    <Navbar/>

    <div className="container py-5 my-5">
    
    <Outlet/>
    </div>

    <Footer/>
    </div>
    </>
  )
}
