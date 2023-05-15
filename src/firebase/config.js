import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUSQhU6DRYE91zG2O7cjMXUhU6AcL-Bxk",
  authDomain: "cteam-291fc.firebaseapp.com",
  projectId: "cteam-291fc",
  storageBucket: "cteam-291fc.appspot.com",
  messagingSenderId: "208673648986",
  appId: "1:208673648986:web:52f3fbe2537442f27b4363",
};

// firebase init
firebase.initializeApp(firebaseConfig);

// init service
const firebaseFirestore = firebase.firestore();
const firebaseAuth = firebase.auth();
const firebaseStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { firebaseFirestore, firebaseAuth, timestamp, firebaseStorage };
