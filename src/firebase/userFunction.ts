import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebase } from "./firebaseConfig";

export const auth = getAuth(firebase);
export const database = getDatabase();


//Register
export const registerUser = async (
  name: string,
  userEmail: string,
  userPassword: string
) => {
  await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential: { user: any }) => {
      const user = userCredential.user;

      if (user !== null) {
        set(ref(database, "users/" + user), {
          username: name,
          userEmail: userEmail,
          userPassword: userPassword,
          userCredential: user,
        });
        return true;
        
      }
    })
    .catch((error: { code: any; message: any }) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
};

//Login
export const loginUser = async (userEmail: string, userPassword: string) => {
  await signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential: { user: any }) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error: { code: any; message: any }) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
};

//Logout
export const logoutUser = async () => {
    await signOut(auth).then(() => {
        
    }).catch((error) => {})
}

//Check Sign In User
export const checkLoginUser = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user?.uid;
      console.log(uid);
      console.log(user);
      return uid;
    } else {
      console.log(user);
      return;

    }

  })
}