import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';

export default function Address() {

 let{OnlinePayment ,cartId} = useContext(CartContext)
console.log(cartId);




  async function handlePayment(values) {
    console.log(values);
   
     let response = await OnlinePayment(cartId, values)
     window.location.href = response.data.session.url;
     console.log(response);
  }
    
    let formik = useFormik({
        initialValues : {
            details : "",
            phone: "",
            city: ""
        },

    onSubmit : handlePayment
    })

  return (
    <>

    <Helmet>
    <meta charSet="utf-8" />
    <title>Address page</title>
    </Helmet>
     <form onSubmit={formik.handleSubmit} className="my-5 w-75 mx-auto  min-vh-100">
     
     <label htmlFor="details" className='mb-3 fw-bold'>Details : </label>
     <input
       type="text"
       className="form-control mb-3"
       name='details'
       value={formik.values.details}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
     
     />
     <label htmlFor="phone" className='mb-3 fw-bold'>phone : </label>
     <input
       type="text"
       className="form-control mb-3"
       name='phone'
       value={formik.values.phone}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
     
     />
     <label htmlFor="city" className='mb-3 fw-bold'>city : </label>
     <input
       type="text"
       className="form-control mb-3"
       name='city'
       value={formik.values.city}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
     
     />

     <button className='btn bg-main text-white'><i className="fa-solid fa-credit-card me-2"></i> Pay Now</button>
     
     </form>
    </>
  )
}
