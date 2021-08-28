import Vue from "vue"
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

const initialUserState = {
  uid: "",
  // displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, photoURL } = user
    state = {
      uid,
      // displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
