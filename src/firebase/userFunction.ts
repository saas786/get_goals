import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebase } from "./firebaseConfig";

export const auth = getAuth(firebase);
export const database = getDatabase();

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
      }
    })
    .catch((error: { code: any; message: any }) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const loginUser = async (userEmail: string, userPassword: string) => {
  await signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential: { user: any }) => {
      const user = userCredential.user;
    })
    .catch((error: { code: any; message: any }) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logoutUser = async () => {
    await signOut(auth).then(() => {
        
    }).catch((error) => {})
}