import React, { useState, useEffect } from "react";
import validationService from "../../service/Validation";
import Preloader from "../../components/Preloader/Preloader";
import Avatar, { ConfigProvider } from "react-avatar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { userserviceurl } from "../../service/url";
import "./profile.scss";

function Profile() {
  let history = useHistory();
  const [edit, setEdit] = useState(false);
  let userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const [userDetails, setUserDetails] = useState(userDetail);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("getting");
    await axios
      .get(`${userserviceurl}/${userDetail?.id}`)
      .then((res) => {
        setLoading(false);
        setUserDetails(res.data);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.dark("Incorrect Credentials");
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
  };

  const changeUserDetails = async () => {
    console.log("Prof chnge");
    const profile = {
      name: userDetails.name,
      email: userDetails.email,
      password: password,
      phoneNumber: userDetails.phoneNumber,
    };
    console.log(profile, "toktn ", userDetail.token, "id", userDetails.id);
    await axios
      .post(`${userserviceurl}/updateProfile/${userDetails.id}`, profile, {
        headers: {
          Authorization: userDetail.token,
        },
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
                  <Avatar
                    name={userDetails?.name}
                    round={true}
                    align="center"
                  />
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
                {edit && (
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
                        fetchData();
                      }}
                      type="button"
                      className={`btn btn-${edit ? "danger" : "primary"} `}
                    >
                      {edit ? "CANCEL" : "EDIT"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
  return content;
}

export default Profile;
