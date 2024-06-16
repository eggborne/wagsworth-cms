import firebase from 'firebase/compat/app';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log('using firebaseConfig', firebaseConfig);

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://google.com/',
  privacyPolicyUrl: function () {
    window.location.assign('https://google.com/');
  }
};

const app = firebase.initializeApp(firebaseConfig);


const database = getDatabase(app);

if (process.env.NODE_ENV === 'development') {
  console.warn('using emulator for DB')
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
}


const ui = new firebaseui.auth.AuthUI(firebase.auth());
const startUI = () => {
  ui.start('#firebaseAuthContainer', uiConfig);
};

const resetUI = () => {
  ui.reset();
  ui.start('#firebaseAuthContainer', uiConfig);
}

const initApp = () => {
  return new Promise<firebase.User | null>((resolve) => {
    app.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          console.log('---> User is signed in!', user);
          resolve(user); // Resolve the promise with the user object
        } else {
          console.log('NOT SIGNED IN!');
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