import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/dropdown_icon.png";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const [menu, setMenu] = useState("Shop");

  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  let dispatch = useDispatch();
  const navigate = useNavigate();

  

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate.push("/login");
  };


  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav_dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart p-4 ">
        <Link to="/login">
          <button style={{ backgroundColor: "green", color: "white" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button style={{ backgroundColor: "green", color: "white" }}>
            Register
          </button>
        </Link>

        <Link to="/logout">
          <button style={{ backgroundColor: "orange", color: "white" }}>
            Logout
          </button>
        </Link>

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
