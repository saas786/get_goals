export type UserProfile = {
    userEmail: string;
    userName: string;
    userUid: string;
    currentPoint: number;
    totalPoint: number;
}

export type UserCollection = {
    [uid: string]: UserProfile;
}