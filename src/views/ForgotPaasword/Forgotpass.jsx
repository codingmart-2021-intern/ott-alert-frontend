import React, { useState } from "react";
import "./forgotpass.scss";
function ForgotPassword() {
  const [sentRequest, setSentRequest] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);

  return (
    <div className="forgot-pass">
      <div className="forgot-form">
        <h2 className="text-light">Password Reset</h2>
        <br></br>
        {!sentRequest && !otpValidate && (
          <>
            <input type="email" name="email" placeholder="Enter Email" />

            <button
              type="button"
              class="btn-1 btn-primary"
              onClick={() => setSentRequest(true)}
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
            />
            <br></br>
            <input
              type="submit"
              value="SUBMIT"
              className="btn"
              onClick={() => {
                setSentRequest(false);
                setOtpValidate(true);
              }}
              style={{ backgroundColor: "red" }}
            />
          </>
        )}
        {otpValidate && (
          <>
            <input type="password" name="pass" placeholder="New Password" />
            <br></br>
            <input type="password" name="pass" placeholder="Confirm Password" />
            <br></br>
            <input
              type="submit"
              value="SUBMIT"
              className="btn"
              style={{ backgroundColor: "red" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
