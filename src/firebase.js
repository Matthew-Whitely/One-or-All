import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBKWXTK5Y4NzVRIe7xSf6koSRLCSmlc8s",
  authDomain: "one-or-all-database.firebaseapp.com",
  projectId: "one-or-all-database",
  storageBucket: "one-or-all-database.appspot.com",
  messagingSenderId: "596494125134",
  appId: "1:596494125134:web:8e5e9a549630b749bd1b1f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
