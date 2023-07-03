//! Here First of all, We will complete the Setup for the firebase
import firebase from "firebase/compat/app"  //! for Firebase V9 we use  "/compat/" to prevent error
import "firebase/compat/database"
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAWjIW9e-Vf2HsAzGrLkAZKJ9tPEJGZEqg",
    authDomain: "react-crud-fc5b3.firebaseapp.com",
    databaseURL: "https://react-crud-fc5b3-default-rtdb.firebaseio.com",
    projectId: "react-crud-fc5b3",
    storageBucket: "react-crud-fc5b3.appspot.com",
    messagingSenderId: "543697026057",
    appId: "1:543697026057:web:57dfb7b2e2ac12c4f98cd8"
  };

const firebaseDB=firebase.initializeApp(firebaseConfig);
export default firebaseDB.database().ref();

