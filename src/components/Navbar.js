import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../styles/carticon.css";
const Navbar = () => {
  const dispatch = useDispatch();

  const cart_count = useSelector((state) =>
    state.CartReducer.cart_count ? state.CartReducer.cart_count : 0
  );
  const auth = useSelector((state) =>
    state.LoginReducer.login_status ? state.LoginReducer.login_status : false
  );
  function handleLogout() {
    // localStorage.setItem('auth',false)
    // window.location.reload()
    dispatch({ type: "LOGIN_FAILED", login_data: {} });
  }
  return (
    <>
      {auth == false ? (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" href="#">
              The Silai Company
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink classname="nav-link" to="/mycart">
                    <i className="fa" style={{ fontSize: 24 }}>
                      
                    </i>
                    <span className="badge badge-warning" id="lblCartCount">
                      {cart_count}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Registration
                  </NavLink>
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="btn btn-outline-success"
                type="submit"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" href="#">
              The Silai Company
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myorders">
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink classname="nav-link" to="/mycart">
                    <i className="fa" style={{ fontSize: 24 }}>
                      
                    </i>
                    <span className="badge badge-warning" id="lblCartCount">
                      {cart_count}
                    </span>
                  </NavLink>
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="btn btn-outline-success"
                type="submit"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
