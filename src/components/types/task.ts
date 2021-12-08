import { readTaskRef } from "firebase/taskFunction"

export type TaskEntry = {
    name: string;
    time: string;
    category: string;
}

export type TaskCollection = {
    [uid: string]: TaskEntry;
}

