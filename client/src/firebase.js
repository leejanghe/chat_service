// import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
console.log("firebaseConfig", firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

export default firebase;
// export const authService = firebase.auth();
// apiKey: process.env.REACT_APP_API_KEY,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_APP_ID,
// measurementId: process.env.REACT_APP_MEASUREMENT_ID,

// apiKey: "AIzaSyAoQb5me6-VubVippyDwobjt6eQazxC0Mg",
// authDomain: "react-firebase-chat-e3c29.firebaseapp.com",
// projectId: "react-firebase-chat-e3c29",
// storageBucket: "react-firebase-chat-e3c29.appspot.com",
// messagingSenderId: "427711982392",
// appId: "1:427711982392:web:1bb42e5cf0e98e6c77afcd",
// measurementId: "G-T4XPN50K07",
