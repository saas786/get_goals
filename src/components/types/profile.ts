export type UserProfile = {
  profile: {
    userEmail: string;
    userName: string;
    userUid: string;
    currentPoint: number;
    totalPoint: number;
  };
};

export type UserCollection = {
  [uid: string]: UserProfile;
};

export type friendPoint = {
  friends: {
    [uid:string] : {
      totalPoint: number
    }
  }
}
