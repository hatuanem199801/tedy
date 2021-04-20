import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDQQoWcdJtYNgBTfFFKtU0Ca7kt5RAq4ig",
  authDomain: "hte-media.firebaseapp.com",
  databaseURL: "https://hte-media-default-rtdb.firebaseio.com",
  projectId: "hte-media",
  storageBucket: "hte-media.appspot.com",
  messagingSenderId: "146266078692",
  appId: "1:146266078692:web:5b4b6146e8e54a21aa9bf1",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
