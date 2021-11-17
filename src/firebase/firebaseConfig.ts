//Import Config
import { initializeApp } from "firebase/app";

//Import Auth
import "firebase/compat/auth"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import firebase from "firebase/compat/app"


// SET UP CONFIG
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

/* Version 9 */
// const firebase = initializeApp(firebaseConfig);
// export const auth = getAuth(firebase);

/* Version 8 */
if (!firebase.apps.length) firebase.initializeApp({...firebaseConfig})
export const auth = firebase.auth()
export const usersData = firebase.database().ref("users");

// SET UP CREATE USER ACCOUNT
// type userInfo = {
//     name: string,
//     userEmail: string,
//     userPassword: string
// }

export const randomString = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

export const createNewUser = (
    user_uid: string,
    user_email: string,
    user_name: string,
    pub_id: string
) => {
    usersData.child(user_uid).set({
        id: user_uid,
        email: user_email,
        name: user_name,
        public_id: pub_id,
        points: 0
    });
};

export const registerUser = async ( name:string, userEmail:string, userPassword:string ) => {  
    /* Version 9 */
    // await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    // .then((userCredential) => {
    //     const user = userCredential.user;
    // })
    // .catch((error) =>{
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // })

    /* Version 8 */
    try{
        await firebase.auth().createUserWithEmailAndPassword(userEmail,userPassword);

        const user = firebase.auth().currentUser;
        user?.updateProfile({
            displayName: name,
        });

        if (user !== null){
            const public_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            
        }
    }

}