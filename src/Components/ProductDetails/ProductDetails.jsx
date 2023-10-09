import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import { Helmet } from "react-helmet"
import Slider from "react-slick"
import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"



export default function ProductDetails() {

  let { setCartNum } = useContext(CartContext)
  let {addToCart} = useContext(CartContext)


 async function addProductToCart(id) {

     let response = await addToCart(id);
     if(response.data.status === 'success') {
      toast.success('Product added successfully' , {
        duration: 2000,
        position: 'top-right',
        
      } )
      setCartNum(response.data.numOfCartItems)
     }
     else {
  
      toast.error('Error added successfully' , {
        duration: 2000,
        position: 'top-right',
        
      } )
  
     }
  }


  const params = useParams()


    function getProductDetails(id) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }



    let {isError ,data , isLoading }  = useQuery('productDetails' ,  () => getProductDetails(params.id))

    console.log(data?.data.data);


     
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  
    
  };


  return (
    <div>
    {isLoading ? (
      <Loading />
    ) : data?.data.data ? (
      <div  className="row py-5 align-items-center " key={data?.data.data._id}>
        <div className="col-md-4 col-sm-6">

        <Slider {...settings}>
              {data?.data.data.images.map((img) => (
                <img key={img.id} src={img} className="w-100 img-thumbnail " alt={data?.data.data.title} />
              ))}

              <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
              </Helmet>
            </Slider>

        </div>
        <div className="col-md-8 col-sm-6">
          <h2 className="h5">{data?.data.data.title}</h2>
          <h3 className="h6">{data?.data.data.description}</h3>
          <p className="text-main fw-bold my-2">
            {data?.data.data.category.name}
          </p>
          <span className="fw-bold "> Price : {data?.data.data.price} EGP     <del className="text-danger" >{data?.data.data.price+50}</del> </span>
          <div className="d-flex justify-content-between mt-2">
          <span className="fw-bold ">
          ratingsQuantity : {data?.data.data.ratingsQuantity}
             
            </span>
            <span className="fw-bold">
              {data?.data.data.ratingsAverage}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button onClick={() => addProductToCart(data?.data.data._id)} className="btn bg-main text-white form-control  mt-3"  >
            Add to Cart
          </button>
        </div>
      </div>
    ) : (
      ""
    )}
  </div>
  )
}
