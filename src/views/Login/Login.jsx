import React, { useState } from "react";
import "./Login.scss";
import validationService from "../../service/Validation";
import Preloader from "../../components/Preloader/Preloader";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { userserviceurl } from "../../service/url";

function Login({ setUserData }) {
  let history = useHistory();
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
  const handleSubmit = async (e) => {
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
    setLoading(true);
    await axios
      .post(`${userserviceurl}/login`, signinDetails)
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          toast.success("Login Successfully");
          setUserData(true);
          localStorage.setItem("userDetails", JSON.stringify(res.data));
          console.log(res.data);
          history.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.dark("Incorrect Credentials");
        }
      });
  };
  let content;
  if (loading) {
    content = <Preloader />;
  } else {
    content = (
      <div className="login">
        <form className="si-form" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <label htmlFor="email">
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
          <label htmlFor="password">
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
              to="/forgotpassword"
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
