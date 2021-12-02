import { initializeApp } from "firebase/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBR26h7PnpydyPrATd0PlwnEjIcSDe0m-c",
  authDomain: "get-goals-09031998.firebaseapp.com",
  databaseURL: "https://get-goals-09031998.firebaseio.com",
  projectId: "get-goals-09031998",
  storageBucket: "get-goals-09031998.appspot.com",
  messagingSenderId: "521644495951",
  appId: "1:521644495951:web:e239d3066c6b235ac4c63a",
  measurementId: "G-KN1MDQD4B4",
};

export const firebase = initializeApp(firebaseConfig);
