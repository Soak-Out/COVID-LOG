import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCrsqcPg22GcYQIGUMMKxHiAaycTT4-8GQ",
  authDomain: "soak-out.firebaseapp.com",
  projectId: "soak-out",
  storageBucket: "soak-out.appspot.com",
  messagingSenderId: "239310842026",
  appId: "1:239310842026:web:d36d058bbf127774c708d3",
  measurementId: "G-QQ3TSNDVPJ",
}

firebase.initializeApp(firebaseConfig)
