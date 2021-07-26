import React,{useState} from "react";
import validationService from "../../service/Validation";
import Preloader from "../../components/Preloader/Preloader";
import Avatar,{ ConfigProvider } from "react-avatar";
import  {toast} from 'react-toastify'
import "./profile.scss";
function Profile() {
    const [edit,setEdit] = useState(false);
    const [editPassword,setEditPassword] = useState(false);
    let userDetail = {
      username: "sample",
      email: "sample@sample.com",
      mobileno: "9999989999",
    }
    const [userDetails, setUserDetails] = useState(userDetail);
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
        : "Enter a Valid Mobileno"; error.email = !userDetails.email
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
        errors.username || errors.email ||
        errors.password || errors.confirmPassword ||
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
          toast.dark("Enter Vaild Details")
          return
      }
      if (!userDetails.username) {
          setErrors((prevState) => ({ ...prevState, username: 'Please enter your username' }))
          return
        }
  
        if (!userDetails.mobileno) {
          setErrors((prevState) => ({ ...prevState, mobileno: 'Please enter your Mobile No' }))
          return
        }
      if (!userDetails.email) {
          setErrors((prevState) => ({ ...prevState, email: 'Please enter your email' }))
          return
        }
    
        if (!userDetails.password) {
          setErrors((prevState) => ({ ...prevState, password: 'Please enter your password' }))
          return
        }
    
        if (!userDetails.confirmPassword) {
          setErrors((prevState) => ({ ...prevState, confirmPassword: 'Please enter your confirm password' }))
          return
        }
        console.log(userDetails);
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
                <ConfigProvider colors={['red', 'green','royalblue']}>
                  <Avatar
                    name={userDetails.username}
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
                      name="username"
                      value={userDetails?.username}
                      disabled={!edit}
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
                      placeholder="MobileNo"
                      name="mobileno"
                      value={userDetails?.mobileno}
                      disabled={true}
                      onChange={onChangeHandler}
                      autoComplete="off"
                    />
                    {errors.mobileno && (
                      <span className="text-danger pb-3">{errors.mobileno}</span>
                    )}
                  </div>
                  {  (edit && editPassword) && <>
                        <div className="form-group">
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control input"
                          name="password"
                          value={userDetails?.password}
                          disabled={!edit}
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
                          className="form-control input"
                          name="confirmPassword"
                          value={userDetails?.confirmPassword}
                          disabled={!edit}
                          onChange={onChangeHandler}
                          autoComplete="off"
                        />
                        {errors.confirmPassword && (
                          <span className="text-danger pb-3">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </>
                  }
                 <div className={`d-flex justify-content-${edit?"evenly":"center"} b w-100`}>
                  <div>
                    {edit && <button  type="submit" className="btn btn-primary">{"SAVE"}</button>}
                  </div>
                  <div>
                    <button onClick={()=>{
                      setEdit(!edit)
                      setUserDetails(userDetail);
                      }} 
                      type="button" 
                      className={`btn btn-${edit?"danger":"primary"} `}
                    >
                      {edit?"CANCEL":"EDIT"}
                    </button>
                  </div>
                 </div>
                </form>
                {
                  edit && 
                  <p 
                    className="text-capitalize m-2 cursorPointer text-light" 
                    onClick={()=>{setEditPassword(!editPassword)}}
                  >
                    {!editPassword ? "Change Password":"Don't want to change password"}
                  </p>
                }
              </div>
            </div>
          </div>
        </>
      );
    }
    return content;
  }
  

export default Profile;
