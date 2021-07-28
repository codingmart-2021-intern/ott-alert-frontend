import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import { useState } from "react"
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup"
import Profile from "./views/Profile/Profile"
import Alerts from "./views/Alerts/Alerts"
import ForgotPassword from "./views/ForgotPaasword/Forgotpass";
import { ToastContainer } from 'react-toastify';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./views/ProtectedRoute/ProtectedRoute";
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
function App() {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userDetails")));
  return (
    <div className="App">
      <Router>
        <Navbar userData={userData} setUserData={setUserData} />
        <Switch>
          <ProtectedRoute path="/" exact component={() => <Alerts />} />
          <Route path="/login" exact component={() => <Login setUserData={setUserData} />} />
          <Route path="/register" exact component={() => <Signup />} />
          <ProtectedRoute path="/profile" exact component={() => <Profile />} />
          <Route path="/forgotpassword" exact component={() => <ForgotPassword />} />
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;
