import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup"
import Profile from "./views/Profile/Profile"
import Alerts from "./views/Alerts/Alerts"
import Preloader from "./components/Preloader/Preloader"
import ForgotPassword from "./views/ForgotPaasword/Forgotpass";
import { ToastContainer } from 'react-toastify';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Alerts />} />
          <Route path="/register" exact component={() => <Signup />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route path="/preloader" exact component={() => <Preloader />} />
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
