import React, { useState } from "react";
import "./forgotpass.scss";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";
import { userserviceurl } from "../../service/url";
import validationService from "../../service/Validation";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
function ForgotPassword() {
  let history = useHistory();
  const [sentRequest, setSentRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validateotp, setValidateotp] = useState({
    otp: "",
    password: "",
  });
  const [email, setEmail] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    password: "",
  });

  const validate = () => {
    let error = {};
    error.password = !validateotp.password
      ? ""
      : validationService.password(validateotp.password)
      ? false
      : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";
    setErrors(error);
    return !error.password ? true : false;
  };
  const onChangeEmailHandler = (e) => {
    let user = email;
    user[e.target.name] = e.target.value;
    setEmail(user);
  };
  const onChangeotpHandler = (e) => {
    let otp = validateotp;
    otp[e.target.name] = e.target.value;
    setValidateotp(otp);
    validate();
  };
  const getOtp = async () => {
    console.log("OTP Requested");
    toast.success("OTP Requested");
    setLoading(true);
    await axios
      .post(`${userserviceurl}/forgotpassword/generate/otp`, email)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.dark("OTP Sent Successfully");
        setSentRequest(true);
      })
      .catch((err) => {
        toast.error("Email does not exist");
        console.log(err);
        setLoading(false);
      });
  };

  const submitOtp = async () => {
    validate();
    if (!validateotp.password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Please enter your password",
      }));
      return;
    }
    setLoading(true);
    await axios
      .post(`${userserviceurl}/forgotpassword/reset`, validateotp)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.dark("Password Changed Successfully");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Incorrect OTP");
        setLoading(false);
      });
  };

  let content;
  if (loading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        <div className="forgot-pass">
          <div className="forgot-form">
            <h2 className="text-light">Password Reset</h2>
            <br></br>
            {!sentRequest && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={onChangeEmailHandler}
                  autoComplete="off"
                  required
                />

                <button
                  type="button"
                  className="btn-1 btn-primary"
                  onClick={getOtp}
                >
                  Get OTP
                </button>
              </>
            )}
            {sentRequest && (
              <>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter the OTP"
                  style={{ width: "100%", height: "40px" }}
                  onChange={onChangeotpHandler}
                  autoComplete="off"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  onChange={onChangeotpHandler}
                />
                {errors.password && (
                  <span className="text-danger pb-3">{errors.password}</span>
                )}
                <input
                  type="submit"
                  value="SUBMIT"
                  className="btn"
                  onClick={submitOtp}
                  style={{ backgroundColor: "red" }}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
  return content;
}

export default ForgotPassword;
