import { child, get, getDatabase, ref, set } from "@firebase/database";
import { TaskEntry } from "components/types/task";
import { firebase } from "./firebaseConfig";

const db = getDatabase(firebase)
const dbRef = ref(db)

export const readTaskRef = (userId: string) => ref(db, `users/` + userId + "/tasks");

export const createNewTask = (
    task: TaskEntry,
    newTaskID: string,
    userID: string
) => {
    set(ref(db, `users/` + userID + `/tasks/` + newTaskID ), task)
}

export const readAllTask = (userId: string) => get(child(dbRef, `users/` + userId + "/tasks"))