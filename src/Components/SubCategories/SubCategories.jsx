import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import usePagination from '@mui/material/usePagination/usePagination'
import { useParams } from 'react-router-dom'

export default function Categoies() {

let parmas = useParams()

  function getSubCategory(id) {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }


  let {data , isError , isLoading , isFetched} = useQuery('subCategory' , () => getSubCategory(parmas.id))

  console.log(data?.data.data);
  console.log(parmas.id);



  return (
    <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>SubCategoies page</title>
    
    </Helmet>
    


{isLoading ? <Loading/> : <div className='container my-5'>

                <div className='row gy-4'>    


                
                
                        <div  className="col-lg-3 col-md-4">
                        <div className="product p-2">
                        
                            <img src={data?.data.data.image} className='w-100 customHeight'  alt="" />
                            <h3 className='h5 mt-4 text-main'>{data?.data.data.name}</h3>
                        
                        </div>
                        </div>


                
                </div>
            </div>

}




    
     





    </>
  )
}
