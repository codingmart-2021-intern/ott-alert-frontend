import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Navbar.scss";
//import { Nav, Container } from "react-bootstrap";

function Navbar() {
  return (
    <>
      <nav className="navbar d-flex justify-content-between header navbar-expand-lg navbar-dark bg-dark">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="logo" className="imglogo rotate-in-center" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <div className="logout">
            <Link className="link m-3 btn btn-outline-danger" to="/profile">
              Profile
            </Link>
            <Link className="link m-3 btn btn-outline-danger" to="/login">
              Login
            </Link>
            <Link className="link m-3 btn btn-outline-danger" to="/register">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
