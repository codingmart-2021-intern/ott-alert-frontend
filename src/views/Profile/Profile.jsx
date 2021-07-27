import React, { useState, useEffect } from "react";
import validationService from "../../service/Validation";
import Preloader from "../../components/Preloader/Preloader";
import Avatar, { ConfigProvider } from "react-avatar";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { userserviceurl } from "../../service/url";
import "./profile.scss";

function Profile() {
  let history = useHistory();
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  let userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const [userDetails, setUserDetails] = useState(userDetail);
  /* const [formdetails,setformdetails] = useState({
  name:
}); */
  /* const [editUser, seteditUser] = useState({
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber,
  }); */
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("getting");
      await axios
        .get(`${userserviceurl}/${userDetail?.id}`)
        .then((res) => {
          if (res.status === 201) {
            setLoading(false);
            console.log(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            toast.dark("Incorrect Credentials");
          }
        });
    };
    fetchData();
  }, [userDetail?.id]);

  const validate = () => {
    let error = {};
    error.name = !userDetails?.name
      ? ""
      : validationService.username(userDetails?.name)
      ? false
      : "Minimum 5 characters, no spaces and special characters";

    error.password = !password
      ? ""
      : validationService.password(password)
      ? false
      : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";

    setErrors(error);

    return !error.password && !error.name ? true : false;
  };
  const onChangeHandler = (e) => {
    let user = userDetails;
    user[e.target.name] = e.target.value;
    setUserDetails(user);
    validate();
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    validate();
    if (!errors.name && userDetails.name) {
      changeUserDetails();
    }
    if (!errors.password && password) {
      changeUserPassword();
    }
  };

  const changeUserDetails = async () => {
    console.log("Prof chnge");
    await axios
      .post(`${userserviceurl}/updateProfile/${userDetails.id}`, {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        phoneNumber: userDetails.phoneNumber,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Profile Updated Successfully");
        console.log(res);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.dark("Incorrect Credentials");
        }
      });
  };

  const changeUserPassword = async () => {
    console.log("Pswd chnge");
    await axios
      .post(`${userserviceurl}/changePassword`, {
        email: userDetails.email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Password Changed Successfully");
        console.log(res);
        history.push("/");
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
      <>
        <div className="userProfile">
          <div className="card">
            <div className="form-login">
              <h4 className="register-header text-center">Profile</h4>
              <div className="profile-avatar">
                <ConfigProvider colors={["red", "green", "royalblue"]}>
                  <Avatar name={userDetails.name} round={true} align="center" />
                </ConfigProvider>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input"
                    placeholder="Username"
                    name="name"
                    value={userDetails?.name}
                    disabled={!edit}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.name && (
                    <span className="text-danger pb-3">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control input"
                    placeholder="Email"
                    name="email"
                    value={userDetails?.email}
                    disabled={true}
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
                    className="form-control input"
                    placeholder="phoneNumber"
                    name="phoneNumber"
                    value={userDetails?.phoneNumber}
                    disabled={true}
                    onChange={onChangeHandler}
                    autoComplete="off"
                  />
                  {errors.phoneNumber && (
                    <span className="text-danger pb-3">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
                {edit && editPassword && (
                  <>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control input"
                        name="password"
                        value={password}
                        disabled={!edit}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validate();
                        }}
                        autoComplete="off"
                      />
                      {errors.password && (
                        <span className="text-danger pb-3">
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </>
                )}
                <div
                  className={`d-flex justify-content-${
                    edit ? "evenly" : "center"
                  } b w-100`}
                >
                  <div>
                    {edit && (
                      <button type="submit" className="btn btn-primary">
                        {"SAVE"}
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setEdit(!edit);
                        setUserDetails(userDetail);
                      }}
                      type="button"
                      className={`btn btn-${edit ? "danger" : "primary"} `}
                    >
                      {edit ? "CANCEL" : "EDIT"}
                    </button>
                  </div>
                </div>
              </form>
              {edit && (
                <p
                  className="text-capitalize m-2 cursorPointer text-light"
                  onClick={() => {
                    setEditPassword(!editPassword);
                  }}
                >
                  {!editPassword
                    ? "Change Password"
                    : "Don't want to change password"}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  return content;
}

export default Profile;
