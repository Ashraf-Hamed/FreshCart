import {   useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import {useFormik} from 'formik'
import * as Yup from 'yup' ;
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserTokenContext } from './../../Context/UserContext';




export default function Login() {




   let {setUserToken , setUserData} = useContext(UserTokenContext)


   

let navigate = useNavigate()

  let [isLoading, setisLoading] = useState(false);
  let [error , setError] = useState(null)

  const Schema = Yup.object({
   
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Wrong password")
      .required("passWord is required"),
   
  });

 async function LoginSubmit (values) {
    setisLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
  .catch((err) => {
    setisLoading(false);
    setError(err.response.data.message);
  })
  console.log(data);

  if(data.message == "success") {
    
    setisLoading(false)
    localStorage.setItem('userToken', data.token)
    localStorage.setItem('userData', JSON.stringify(data.user))
    setUserToken(data.token);
    setUserData(data.user)
    navigate('/')
     

  }

  }

let formik   = useFormik({
initialValues : {
   
    email:"",
    password:"",
    
},
validationSchema : Schema ,

onSubmit : LoginSubmit
})

  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title> Login page</title>
    </Helmet>





    <div className=" container">

 
      
        <form
          className="my-5 w-75 mx-auto  min-vh-100"
          onSubmit={formik.handleSubmit}
  
        >
    
          <h3 className="my-3">Login Now:</h3>
         
         
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
        
         

        {isLoading ?  <button type="button" className="btn btn-success  mr-auto d-block">
        <i className="fa-solid fa-spinner fa-spin"></i>
        </button>  :   <div className="d-flex align-items-center">
              
        <button
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
        className="btn btn-success   d-block me-3"
      >
        Login  
      </button>

      <Link to= '/forgetpassword' className='btn btn-primary'>Forget Password ? </Link>
    </div>
    
    }

    
    
          
      
          
        
        </form>
      </div>
    </>
  )
}
