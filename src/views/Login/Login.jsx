import React, { useState } from "react";
import "./Login.scss";
import validationService from "../../service/Validation";
import Preloader from "../../components/Preloader/Preloader";
import { Link } from "react-router-dom";

function Login() {
  const [signinDetails, setsigninDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const validate = () => {
    let error = {};
    error.email = !signinDetails.email
      ? ""
      : validationService.email(signinDetails.email)
      ? false
      : "Invalid Email Address";
    setErrors(error);
    return !error.email ? true : false;
  };
  const onChangeHandler = (e) => {
    let user = signinDetails;
    user[e.target.name] = e.target.value;
    setsigninDetails(user);
    validate();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (!signinDetails.email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter your email",
      }));
      return;
    }
    console.log(signinDetails);
  };
  let content;
  if (loading) {
    content = <Preloader />;
  } else {
    content = (
      <div className="login">
        <form className="si-form" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          {errors.email && (
            <span className="text-danger pb-3">{errors.email}</span>
          )}
          <br />
          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <button className="btn" type="submit">
            Sign In
          </button>

          <div className="forgot">
            <Link
              to="/register"
              style={{ textDecoration: "none", float: "left", color: "white" }}
            >
              New User ?
            </Link>
            <Link
              to="/forgetpassword"
              style={{ textDecoration: "none", float: "right" }}
            >
              Forget Password ?
            </Link>
          </div>
        </form>
      </div>
    );
  }

  return content;
}

export default Login;
