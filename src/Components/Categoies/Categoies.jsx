import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Categoies() {


  function getCategory() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }


  let {data , isError , isLoading , isFetched} = useQuery('category' , getCategory)

  console.log(data?.data.data);



  return (
    <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart Categoies page</title>
    
    </Helmet>
    
    
    <h1 className='text-main'>All Categoies</h1>

{isLoading ? <Loading/> : <div className='container my-5'>



<div className='row gy-4'>    

{data?.data.data.map((category) => 
  
  
  <div key={category._id} className="col-lg-3 col-md-4">
  <div className="product p-2">
  <Link to={`categories/${category._id}`}>
       <img src={category.image} className='w-100 customHeight'  alt="" />
       <h3 className='h5 mt-4 text-main'>{category.name}</h3>
  </Link>
  </div>
</div>


  ) }
</div>
</div>}




    
     





    </>
  )
}
