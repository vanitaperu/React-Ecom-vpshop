import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Register from "./Pages/Register";
import RegisterComplete from "./Pages/RegisterComplete";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";



function App() {


const dispatch = useDispatch();

// to check firebase auth state
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
    }
  });
  // cleanup
  return () => unsubscribe();
}, []);




  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <div>
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route
              path="/mens"
              element={<ShopCategory banner={men_banner} category="men" />}
            />
            <Route
              path="/womens"
              element={<ShopCategory banner={women_banner} category="women" />}
            />
            <Route
              path="/kids"
              element={<ShopCategory banner={kid_banner} category="kid" />}
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/register/complete" element={<RegisterComplete />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
