import firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDFDG7c0rgr0qYDgAh6apt96x8ulMDjPXE",
  authDomain: "openhack-a04cd.firebaseapp.com",
  databaseURL: "https://openhack-a04cd.firebaseio.com",
  projectId: "openhack-a04cd",
  storageBucket: "openhack-a04cd.appspot.com",
  messagingSenderId: "1076794982638"
};
const fire = firebase.initializeApp(config);

export default fire;
