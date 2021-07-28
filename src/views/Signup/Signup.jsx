import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import "./Signup.scss";
import validationService from "../../service/Validation";
import "./Signup.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { userserviceurl } from "../../service/url";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    mobileno: "",
    password: "",
    confirmPassword: "",
  });
  let history = useHistory();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    mobileno: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const validate = () => {
    let error = {};
    error.username = !userDetails.username
      ? ""
      : validationService.username(userDetails.username)
      ? false
      : "Minimum 5 characters, no spaces and special characters";
    error.email = !userDetails.email
      ? ""
      : validationService.email(userDetails.email)
      ? false
      : "Invalid Email Address";
    error.password = !userDetails.password
      ? ""
      : validationService.password(userDetails.password)
      ? false
      : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";
    error.mobileno = !userDetails.mobileno
      ? ""
      : validationService.mobileno(userDetails.mobileno)
      ? false
      : "Enter a Valid Mobileno";
    error.email = !userDetails.email
      ? ""
      : validationService.email(userDetails.email)
      ? false
      : "Invalid Email Address";
    error.password = !userDetails.password
      ? ""
      : validationService.password(userDetails.password)
      ? false
      : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";
    error.mobileno = !userDetails.mobileno
      ? ""
      : validationService.mobileno(userDetails.mobileno)
      ? false
      : "Enter a Valid Mobileno";
    error.confirmPassword = !userDetails.confirmPassword
      ? ""
      : userDetails.password === userDetails.confirmPassword
      ? false
      : "password and confirm password are not same";
    setErrors(error);
    return !error.email &&
      !error.password &&
      !error.username &&
      !error.confirmPassword &&
      !error.mobileno
      ? true
      : false;
  };
  const onChangeHandler = (e) => {
    let user = userDetails;
    user[e.target.name] = e.target.value;
    if (
      userDetails.password !== userDetails.confirmPassword &&
      e.target.name === "confirmPassword"
    ) {
      let error = { ...errors };
      error.confirmPassword = "Password and confirm password are not same";
      setErrors(error);
      return;
    } else {
      let error = { ...errors };
      error.confirmPassword = false;
      setErrors(error);
    }
    setUserDetails(user);
    validate();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    validate();
    if (
      errors.username ||
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.mobileno
    ) {
      return;
    }
    if (
      !userDetails.email &&
      !userDetails.password &&
      !userDetails.username &&
      !userDetails.confirmPassword &&
      !userDetails.mobileno
    ) {
      toast.dark("Enter Vaild Details");
      return;
    }
    if (!userDetails.username) {
      setErrors((prevState) => ({
        ...prevState,
        username: "Please enter your username",
      }));
      return;
    }

    if (!userDetails.mobileno) {
      setErrors((prevState) => ({
        ...prevState,
        mobileno: "Please enter your Mobile No",
      }));
      return;
    }
    if (!userDetails.email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter your email",
      }));
      return;
    }

    if (!userDetails.password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Please enter your password",
      }));
      return;
    }

    if (!userDetails.confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Please enter your confirm password",
      }));
      return;
    }
    siginRequest();
  };

  const siginRequest = async () => {
    console.log("Signing in");
    const signupdetails = {
      name: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
      phoneNumber: userDetails.mobileno,
    };
    console.log(signupdetails);
    setLoading(true);
    await axios
      .post(`${userserviceurl}/register`, signupdetails)
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          toast.success("Registered Successfully");
          history.push("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          toast.dark("Email Already Exist");
        }
      });
  };

  let content;
  if (loading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        <div className="signup">
          <div className="card">
            <div className="form-login">
              <h2 className="register-header">Register</h2>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={userDetails.username}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.username && (
                    <span className="text-danger pb-3">{errors.username}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={userDetails.email}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.email && (
                    <span className="text-danger pb-3">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MobileNo"
                    name="mobileno"
                    maxLength="10"
                    value={userDetails.mobileno}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.mobileno && (
                    <span className="text-danger pb-3">{errors.mobileno}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    value={userDetails.password}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.password && (
                    <span className="text-danger pb-3">{errors.password}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="confirmPassword"
                    value={userDetails.confirmPassword}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.confirmPassword && (
                    <span className="text-danger pb-3">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                <input type="submit" value="SIGN UP" className="btn" />
              </form>
            </div>
            <div className="linktologin">
              <Link to="/login">
                <h5>Already a User?</h5>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  return content;
}

export default Signup;
