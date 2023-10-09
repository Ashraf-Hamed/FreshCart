import React from 'react'
import imgError from '../../assets/error.svg'
export default function NotFound() {
  return (
    <div className=' min-vh-100'>
    <div className="container text-center pt-5">
      <img src={imgError} alt="imgError" />
      <p className='text-muted mt-5'>We couldn't find what you were looking for.</p>
      <p className='fw-bold'>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p>
    </div>
  </div>
  )
}
