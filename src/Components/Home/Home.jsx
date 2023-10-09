import axios from 'axios'
import React from 'react'
import {Helmet} from 'react-helmet'
import { useQuery } from 'react-query';
import FeatuerdProducts from '../FeatuerdProducts/FeatuerdProducts';
import MainCategorySlider from '../MainCategorySlider/MainCategorySlider';
import CategorySlider from '../CategorySlider/CategorySlider'
export default function Home() {


  return (
    <>

    <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart Home</title>
      
      </Helmet>
     
      <MainCategorySlider/>
      <CategorySlider/>
      <FeatuerdProducts/>
    </>
  )
}
