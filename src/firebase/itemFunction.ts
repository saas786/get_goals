import { child, get, getDatabase, ref, set } from "firebase/database";
import { firebase } from "./firebaseConfig";

const db = getDatabase(firebase)
const dbRef = ref(db)

export const readShopItemRef= ref(db, `shop/`);