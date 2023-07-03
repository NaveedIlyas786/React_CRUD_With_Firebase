//! Here First of all, We will complete the Setup for the firebase
import firebase from "firebase/compat/app"  //! for Firebase V9 we use  "/compat/" to prevent error
import "firebase/compat/database"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT2xkC888hQC7GfkrE3vlqR1e3s8vod0s",
  authDomain: "fir-crud-3jul2023.firebaseapp.com",
  projectId: "fir-crud-3jul2023",
  storageBucket: "fir-crud-3jul2023.appspot.com",
  messagingSenderId: "256422474479",
  appId: "1:256422474479:web:3420bdf4cb52314635611a"
};

const firebaseDB=firebase.initializeApp(firebaseConfig);
export default firebaseDB.database().ref();

