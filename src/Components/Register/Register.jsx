import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {useFormik} from 'formik'
import * as Yup from 'yup' ;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

let navigate = useNavigate()
  let [isLoading, setisLoading] = useState(false);
  let [error , setError] = useState(null)

  const Schema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3 char")
      .max(7, "max is 7 char")
      .required("name is required"),
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not match")
      .required("passWord is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")] , 'Not matching password')
      .required("repassword is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0-25][0-9]{8}$/, "not match")
      .required("phone is required"),
  });

 async function registerSubmit (values) {
    setisLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
  .catch((err) => {
    setisLoading(false);
    setError(err.response.data.message);
  })
  console.log(data);

  if(data.message == "success") {
  setisLoading(false)
    navigate('/login')

  }

  }

let formik   = useFormik({
initialValues : {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
},
validationSchema : Schema ,

onSubmit : registerSubmit
})

  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Fresh Cart Register page</title>
    </Helmet>





    <div className=" container">
{error ? <div className='alert alert-danger'>{error}</div> :  ''}
 
      
        <form
          className="my-5 w-75 mx-auto  min-vh-100"
          onSubmit={formik.handleSubmit}
  
        >
    
          <h3 className="my-3">Register Now:</h3>
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control mb-3"
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          
          />

          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : (
            ""
          )}
         
          <label htmlFor="email">email</label>
          <input
            type="email"
            className="form-control mb-3"
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />

          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}


          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control mb-3"
  
            id="password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}
        
          <label htmlFor="rePassword">rePassword</label>
          <input
            type="password"
            className="form-control mb-3"
  
            id="rePassword"
            name='rePassword'
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}

         
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control mb-3"
  
            id="phone"
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}
         

        {isLoading ?  <button type="button" className="btn btn-success  ms-auto d-block">
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button>  :   <button
        type="submit"
       
        className="btn btn-success  ms-auto d-block"
      >
        Register
      </button> }
          
      
          
        
        </form>
      </div>
    </>
  )
}
