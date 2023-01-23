import React from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="card">
        <div className="login-box">
          <div className="login-snip">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked onChange={(e) => e.target.value} />
            <label htmlFor="tab-1" className="tab">
              Login
            </label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" onChange={(e) => e.target.value} />
            <label htmlFor="tab-2" className="tab">
              Sign Up
            </label>
            <div className="login-space">
              <Login />
              <Register />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
