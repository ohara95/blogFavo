import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCuDrdf8qO06Tx4cqV3K84s5s4t-U1JM38",
  authDomain: "blogfavo.firebaseapp.com",
  databaseURL: "https://blogfavo.firebaseio.com",
  projectId: "blogfavo",
  storageBucket: "blogfavo.appspot.com",
  messagingSenderId: "809596624102",
  appId: "1:809596624102:web:ffb5aa192a7a3a4a106f27",
  measurementId: "G-DSJBKEMKCE",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
