import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick"; 



export default function CategorySlider() {

  function getCategory() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data , isLoading} = useQuery('categorySlider' , getCategory);


  const settings = {
    dots: false,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
    
  };



  return (
    <>
      
{data?.data.data ? <Slider {...settings}>
  {data?.data.data.map((category) => <img height={200} key={category._id} src={category.image}></img>)}
</Slider> : ''}
   
    </>
  )
}
