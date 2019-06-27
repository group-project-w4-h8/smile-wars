import * as firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyA_0TxFk_pusGY48EogIVxdMbdK6XPWaQY",
  authDomain: "smile-wars.firebaseapp.com",
  databaseURL: "https://smile-wars.firebaseio.com",
  projectId: "smile-wars",
  storageBucket: "smile-wars.appspot.com",
  messagingSenderId: "265073246375",
  appId: "1:265073246375:web:5779c1e26b635783"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var db = firebase.firestore()


export default { db, firebaseConfig, ax }
export {db, firebaseConfig, ax }