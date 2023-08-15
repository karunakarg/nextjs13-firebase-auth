import { initializeApp, getApps, getApp } from "firebase/app";
import { GoogleAuthProvider, connectAuthEmulator, getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "fir-next13-823d8.firebaseapp.com",
    projectId: "fir-next13-823d8",
    storageBucket: "fir-next13-823d8.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
// if (process.env.NODE_ENV === 'development'){
//   connectAuthEmulator(auth, "http://localhost:9099");
// }
export {auth, provider};