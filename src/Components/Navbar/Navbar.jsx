import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useContext } from "react";
import { UserTokenContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";
import { CartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishListContext";


export default function Navbar() {
  let { userToken, setUserToken ,setUserData} = useContext(UserTokenContext);
let {cartNum } = useContext(CartContext)

let {wishlistCount} = useContext(wishlistContext)



 
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem('userData')

    setUserToken(null);
    setUserData(null)
    navigate("/login");
  }

  return (
    <>
    <nav className="navbar navbar-expand-md navbar-light bg-main-light fixed-top">
    <div className="container">
    <Link className="navbar-brand" to="/">
    <img src={logo} alt="fresh Cart" />
    </Link>
    <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="categories">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="brands">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav icon_opration  ms-auto mt-2 mt-lg-0 d-flex align-items-center">
              <li className="nav-item social d-flex align-items-center ">
                <a href="#">
                  <i className="fa-brands fa-facebook mx-2 text-dark"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-twitter mx-2 text-dark"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-linkedin mx-2 text-dark"></i>
                </a>
             
              </li>

              {userToken !== null ? (
                <>
                  <li className="nav-item ">
                    <NavLink className="nav-link" to="cart">
                      <i className="fa-solid fa-cart-shopping fs-5   mx-2  position-relative">
                      <span className="position-absolute top-0 numItem  start-100 translate-middle badge rounded-pill bg-danger">
                         {cartNum}
                    </span>
                      </i>
                    </NavLink>
                    </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/wishlist">
                    <i className="fa-solid fa-heart text-danger mx-2 fs-5 position-relative">
                    <span className="position-absolute favitem top-0 start-100 translate-middle badge rounded-pill bg-danger">
                       {wishlistCount}
                  </span>
                    </i>
                    </NavLink>
                    </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                    <i class="fa-solid fa-circle-user fs-5"></i> 
                    </NavLink>
                    </li>

                    <li className="nav-item">
                      <span
                        className="nav-link cursor-pointer"
                        onClick={() => logOut()}
                      >
                       Logout
                       <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                      </span>
                    </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
    </div>
  </nav>










     

         
    </>
  );
}
