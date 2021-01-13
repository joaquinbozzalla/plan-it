import firebase from 'firebase';
import { USERS, } from '../../constants';
var firebaseui = require('firebaseui');

export const firebaseConfig = {
    apiKey: "AIzaSyAx-prOyc2PprsQPFRc7evmwOcGMbvJkGE",
    authDomain: "daily-planner-67a7f.firebaseapp.com",
    databaseURL: "https://daily-planner-67a7f.firebaseio.com",
    projectId: "daily-planner-67a7f",
    storageBucket: "daily-planner-67a7f.appspot.com",
    messagingSenderId: "389572000842",
    appId: "1:389572000842:web:1c07402ec1f734b9ee3ab3",
    measurementId: "G-G48Z5PEYBT",

    userProfile: USERS,
    useFirestoreForProfile: true

  };

  const uiConfig = {
      signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.firestore();

  export const auth = firebase.auth();
  export const db = firebase.firestore();

  export default firebase;
  /*
  db.settings({
      timestampsInSnapshots: true,
  });
  */
 
  export const startUi = (elementId) => {
      const ui = new firebaseui.auth.AuthUI(auth);
      ui.start(elementId, uiConfig);
  };