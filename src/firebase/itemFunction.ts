import { child, get, getDatabase, ref, set } from "firebase/database";
import { TaskEntry } from "components/types/task";
import { firebase } from "./firebaseConfig";

const db = getDatabase(firebase)
const dbRef = ref(db)

export const readShopItemRef= ref(db, `shop/`);