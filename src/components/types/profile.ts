export type User = {
  profile: UserProfile;
  friends: UserFriendUid;
};

// export type userFriendTotalPoint = {
//   totalPoint: number;
// };

export type UserProfile = {
  userEmail: string;
  userName: string;
  userUid: string;
  currentPoint: number;
  totalPoint: number;
};

export type UserFriendUid = {
  [key: string]: string;
};

export type UserCollection = {
  [uid: string]: User;
};

// export type FriendPoint = {
//   friends: userFriendUid;
// };
