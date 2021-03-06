export type TaskEntry = {
    name: string;
    time: string;
    category: string;
}

export type TaskCollection = {
    [uid: string]: TaskEntry;
}