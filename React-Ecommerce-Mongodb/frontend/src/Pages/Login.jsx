import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../firebase";


const Login = ({ navigate }) => {
  const [email, setEmail] = useState("vanita@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  //const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 

  let dispatch = useDispatch();
  //const auth = firebase.auth();
  //const useNavigate = navigate;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      let navigate = [];
      navigate.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

 const googleLogin = async () => {
   auth
     .signInWithPopup(googleAuthProvider)
     .then(async (result) => {
       const { user } = result;
       const idTokenResult = await user.getIdTokenResult();
       dispatch({
         type: "LOGGED_IN_USER",
         payload: {
           email: user.email,
           token: idTokenResult.token,
         },
       });
      let navigate = [];
      navigate.push("/");
     })
     .catch((err) => {
       console.log(err);
       toast.error(err.message);
     });
 };


  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            background-color="blue" // Change background color to blue
            icon={<GoogleOutlined style={{ color: "#db4437" }} />}
            size="large"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;