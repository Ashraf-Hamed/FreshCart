import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
    
    
    let [isLoading, setisLoading] = useState(false);
    let [error, setError] = useState(null);
  
    let navigate = useNavigate();
  
    async function ForgetPassword (values) {

      setisLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values).catch((err) => {
        setisLoading(false);
        console.log(err);
        setError(err.statusMsg.message);
      })

    console.log(data)
    
    console.log(data);
    navigate('/restCode')
  
    if(data.statusMsg === "success") {
      
      setisLoading(false)
      
    }
  
    }
  let schema = Yup.object({
    email: Yup.string().email('Enter Vaild Email').required(),
  });



  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: ForgetPassword
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> ForgetPassword page</title>
      </Helmet>

      <div className=" container">
        <form
          className="my-5 w-75 mx-auto  min-vh-100"
         onSubmit={formik.handleSubmit}
        >
          <h3 className="my-3">Write Your Email :</h3>

          <input
            type="email"
            className="form-control mb-3"
            name="email"
            value={formik?.values?.email}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            placeholder="Enter your email "
          />

          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          {isLoading ? (
            <button type="button" className="btn btn-success  mx-auto d-block">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <div className="d-flex align-items-center">
              <button
                disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                className="btn bg-main mx-auto text-light my-3"
              >
                Verfiy Email
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
