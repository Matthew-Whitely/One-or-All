import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAHYHco_MwddiV6bNpXhF_x3ArIOGhNphg",
  authDomain: "one-or-all-2.firebaseapp.com",
  projectId: "one-or-all-2",
  storageBucket: "one-or-all-2.appspot.com",
  messagingSenderId: "943435741780",
  appId: "1:943435741780:web:c785055ef27853e23c8bc1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
