import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firebase-firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDKelWPnVUFaupBAl8DYZJVaQ9mjfytUa8",
    authDomain: "sistema-chamados-4152a.firebaseapp.com",
    projectId: "sistema-chamados-4152a",
    storageBucket: "sistema-chamados-4152a.appspot.com",
    messagingSenderId: "110095210024",
    appId: "1:110095210024:web:df93708beee891aafc471d",
    measurementId: "G-79F3770ZY8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
