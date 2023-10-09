
import img1 from '../../assets/amzon.png'
import img2 from '../../assets/Fawry.webp'
import img3 from '../../assets/MasterCard_early_1990s_logo.svg.png'
import img4 from '../../assets/paypal-784404_960_720-900x450.png'
import img5 from '../../assets/app store.png'
import img6 from '../../assets/googlplay.png'



export default function Footer() {
  return (
    <>
      <footer className="p-large">
        <h2>Get the FreshCartApp</h2>
        <p className="mb-4">We Will send a link, Open it on your Phone to download the app</p>
        <div className="container">
          <div className="row mb-5">
            <div className=" col-md-8  input">
              <input
                type="email"
                placeholder="Email.."
                className="form-control"
              />
            </div>
            <div className=" col-md-3 offset-1 shareLink ">
              <button className="btn btn-success">Share App Link </button>
            </div>
          </div>
          
        </div>
        <div className="payment d-flex justify-content-between  align-items-center w-100 ">
       
            <div className="partner   mt-4">
              <span className="me-4 ">Payment Partners</span>
              <span> <img src={img1} className="specialStyle cursor-pointer" alt="" /></span>
              <span> <img src={img2} className="specialStyle cursor-pointer" alt="" /></span>
              <span> <img src={img3}  className="specialStyle cursor-pointer" alt="" /></span>
              <span> <img src={img4} className="specialStyle cursor-pointer"  alt="" /></span>
            </div>

            <div className="delivers mt-4">
            <span className="me-2">Get deliveries with FreshCart</span>
            <span> <img src={img5} className="specialStyledelivers cursor-pointer" alt="" /></span>
            <span> <img src={img6} className="specialStyledelivers cursor-pointer" alt="" /></span>
           
          </div>

            
          </div>
      </footer>
    </>
  );
}
