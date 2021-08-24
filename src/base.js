import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBXDro8H3GLs_LSHcMfTwYYbo9Nxc2WIaI",
  authDomain: "burgers-84c34.firebaseapp.com",
  databaseURL: "https://burgers-84c34-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp}
export default base;