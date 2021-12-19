export type User = {
  profile: UserProfile;
  friends: UserFriendUid;
  achievements : UserAchievement;
};

export type UserProfile = {
  userEmail: string;
  userName: string;
  userUid: string;
  clearedTask: number;
  achievement:string;
  currentPoint: number;
  totalPoint: number;
};

export type UserFriendUid = {
  [key: string]: string;
};

export type UserAchievement = {
  [key: string] : string;
}

export type UserCollection = {
  [uid: string]: User;
};