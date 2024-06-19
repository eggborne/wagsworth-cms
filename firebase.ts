import 'dotenv/config';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
console.log(process.env);

const envSource = process.env.NODE_ENV === 'development' ? import.meta.env : process.env;

const firebaseConfig = {
  apiKey: envSource.VITE_FIREBASE_API_KEY,
  authDomain: envSource.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: envSource.VITE_FIREBASE_DATABASE_URL,
  projectId: envSource.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envSource.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envSource.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envSource.VITE_FIREBASE_APP_ID,
};

console.log('using firebaseConfig', firebaseConfig);

const uiConfig = {
  signInSuccessUrl: './',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://google.com/',
  privacyPolicyUrl: function () {
    window.location.assign('https://google.com/');
  },  
};

const app = firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const startUI = () => {
  ui.start('#firebaseAuthContainer', uiConfig);
};

const resetUI = () => {
  ui.reset();
  ui.start('#firebaseAuthContainer', uiConfig);
}

const initApp = (): Promise<firebase.User | null> => {
  return new Promise((resolve) => {
    app.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          console.log('User is signed in!', user);
          resolve(user); // Resolve the promise with the user object
        } else {
          console.log('User is NOT SIGNED IN!');
          resolve(null); // Resolve the promise with null if no user
        }
      },
      (error) => {
        console.error(error);
        resolve(null); // Resolve with null in case of an error
      }
    );
  });
};

const signUserOut = () => {
  app.auth().signOut();
};

export {
  startUI,
  resetUI,
  initApp,
  signUserOut,
}