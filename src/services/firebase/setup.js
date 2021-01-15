import firebase from 'firebase';
import { USERS, } from '../../constants';
var firebaseui = require('firebaseui');

//TODO: Completar con datos de firebase
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",

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