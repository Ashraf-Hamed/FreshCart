import React from 'react'
import Slider from "react-slick";


import Slider1 from '../../assets/images/slider-image-1.jpeg';
import Slider2 from '../../assets/images/slider-image-2.jpeg';
import Slider3 from '../../assets/images/slider-image-3.jpeg';
import Blog1 from '../../assets/images/grocery-banner.png';
import Blog2 from '../../assets/images/grocery-banner-2.jpeg';


export default function MainCategorySlider() {


  const settings = {
    dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      arrows : false,
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
          dots: false,
          accessibility:false
        }
      },
      {
        breakpoint: 480,
        settings: {
         
         
          dots: false,
        
        }
      }
    ]
    
  };

  return (
    <>
  <div className="row gx-0 my-3">
     <div className="col-md-9  ">
        <Slider {...settings}>
            <img src={Slider1} height={400}  alt="" />
            <img src={Slider2} height={400} alt="" />
            <img src={Slider3} height={400} alt="" />
        </Slider>
     </div>
     <div className="col-md-3">
          <img src={Blog1} height={200}  className='w-100' alt="" />
          <img src={Blog2} height={200} className='w-100' alt="" />
     </div>
  </div>

    </>
  )
}
