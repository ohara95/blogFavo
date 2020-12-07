import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCuDrdf8qO06Tx4cqV3K84s5s4t-U1JM38',
  authDomain: 'blogfavo.firebaseapp.com',
  databaseURL: 'https://blogfavo.firebaseio.com',
  projectId: 'blogfavo',
  storageBucket: 'blogfavo.appspot.com',
  messagingSenderId: '809596624102',
  appId: '1:809596624102:web:ffb5aa192a7a3a4a106f27',
  measurementId: 'G-DSJBKEMKCE',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const providerGithub = new firebase.auth.GithubAuthProvider();
export default firebase;
