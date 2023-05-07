import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkkNOI6EN3LN16Zfc8MzqYqylm-JWfg8E",
  authDomain: "crwn-clothing-db-77736.firebaseapp.com",
  projectId: "crwn-clothing-db-77736",
  storageBucket: "crwn-clothing-db-77736.appspot.com",
  messagingSenderId: "233395939713",
  appId: "1:233395939713:web:d5014232a37f8f86d6a080",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error Creating  the user", error.message);
    }
  }

  return userDocRef;
  //if User Data exist

  //create /set the document with the data from userAuth in my collection

  //return userDocRef
};
