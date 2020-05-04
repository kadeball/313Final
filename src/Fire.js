import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBe3ZKjG-5psPskPvblmdqWnd9dEQq6PP8",
    authDomain: "firestore-1c6ed.firebaseapp.com",
    databaseURL: "https://firestore-1c6ed.firebaseio.com",
    projectId: "firestore-1c6ed",
    storageBucket: "firestore-1c6ed.appspot.com",
    messagingSenderId: "775592174079",
    appId: "1:775592174079:web:cdaf0ddcca9bd4c9e607ca",
    measurementId: "G-40WYDQQ9SK"
};
// Initialize Firebase
const Fire= firebase.initializeApp(firebaseConfig);

export default Fire;