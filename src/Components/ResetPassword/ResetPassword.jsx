import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPssword() {
    
    
    let [isLoading, setisLoading] = useState(false);
    let [error, setError] = useState(null);
  
    let navigate = useNavigate();
  
    async function resetPassword (values) {

      setisLoading(true)
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values).catch((err) => {
        setisLoading(false);
        console.log(err);
        setError(err.response.data.message);
      })

    console.log(data)
    
    console.log(data);
    navigate('/login')
  
    if(data.statusMsg === "success") {
      
      setisLoading(false)
      
    }
  
    }
  let schema = Yup.object({
    email: Yup.string().email('Enter Vaild Email').required(),
    newPassword: Yup.string().required(),
  });



  let formik = useFormik({
    initialValues: {
        email: '',
        newPassword: '',
    },
    validationSchema: schema,
    onSubmit: resetPassword
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Reset Information page</title>
      </Helmet>

      <div className=" container">
        <form
          className="my-5 w-75 mx-auto  min-vh-100"
         onSubmit={formik.handleSubmit}
        >
          <h3 className="my-3 d-flex justify-content-center my-5">Reset Information :</h3>
          <label htmlFor="password" className="mb-2 fw-bold">Email : </label>
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


          <label htmlFor="password" className="mb-2 fw-bold">newPassword :</label>
          <input
            type="password"
            className="form-control mb-3"
  
            name='newPassword'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />
          {formik.errors.newPassword && formik.touched.newPassword? (
            <p className="alert alert-danger">{formik.errors.newPassword}</p>
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
                Confirm
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
