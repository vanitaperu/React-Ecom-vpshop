
// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcpAi5UEOW1zbVUilhfMU_EteiWsI-NcY",
  authDomain: "ecommerce-vpshop.firebaseapp.com",
  projectId: "ecommerce-vpshop",
  storageBucket: "ecommerce-vpshop.appspot.com",
  messagingSenderId: "575732569581",
  appId: "1:575732569581:web:c52b4125893fba816a83e4"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 
