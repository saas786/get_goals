import { getDatabase, ref } from "firebase/database"
import { firebase } from "./firebaseConfig"

const db = getDatabase(firebase)

export const readUserRef = (userId: string) => ref(db, `users/` + userId + `/profile`)
export const readUserNameRef = (userId: string) => ref(db, `users/` + userId + `/profile/userName`)