import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { presentToast } from "components/Toast";
import { firebase, database } from "./firebaseConfig";
import { useState } from "react";

export const auth = getAuth();

//Register
export const registerUser = async (
  name: string,
  userEmail: string,
  userPassword: string
) => {
  await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.email) {
        presentToast("Email " + user.email + " Sucessfully Registered");
      }

      set(ref(database, "users/" + user.uid), {
        userUid: user.uid,
        userName: name,
        userEmail: userEmail,
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      presentToast(errorMessage);
    });
};

//Login
export const loginUser = async (userEmail: string, userPassword: string) => {
  await signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      presentToast("Login successful with email" + user.email);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      presentToast(errorMessage);
      return errorMessage;
    });
};

//Logout
export const logoutUser = async () => {
  await signOut(auth)
    .then(() => {
      presentToast("Okay youre out!");
    })
    .catch((error) => {
      presentToast(error);
    });
};

interface userUid {
  uid:string
}

// Check Sign In User
export const checkLoginUser = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user?.uid;
      const email = user?.email;
      presentToast(uid);
      
    } else {
      presentToast("Not Found");
      return;
    }
  });
};

export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user){
    presentToast(user.uid?? "Hello");
  }
}