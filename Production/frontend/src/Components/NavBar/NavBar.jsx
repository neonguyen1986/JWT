import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux1/apiRequest";
import { createAxiosJWT } from "../../createInstance";
// import { logoutSuccess } from "../../redux1/logoutSlice";
import { logoutSuccess } from "../../redux1/authSlice";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  // console.log('user====', user)
  const accessToken = user?.accessToken;
  const id = user?._id;

  const dispatch = useDispatch()
  const navigate = useNavigate
  let axiosJWT = createAxiosJWT(user, dispatch, logoutSuccess)

  const handleLogout = () => {
    logoutUser(accessToken, dispatch, id, axiosJWT)
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user ? (
        <>
          <p className="navbar-user">Hi, <span> {user.username}  </span> </p>
          <Link
            to="/login"
            className="navbar-logout"
            onClick={handleLogout}
          > Log out</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login"> Login </Link>
          <Link to="/register" className="navbar-register"> Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
