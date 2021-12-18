import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { presentToast } from "components/Toast";
import {
  UserCollection,
  UserFriendUid,
  UserProfile,
} from "components/types/profile";
import {  get, ref } from "firebase/database";
import { database } from "firebase/firebaseConfig";
import {  readUserRef } from "firebase/profileFunction";
import { useContext, useEffect, useState } from "react";
import { useDatabaseObjectData } from "reactfire";

function UserList() {
  const [userName, setUsername] = useState<string>("");
  const currentUserProfileRef = readUserRef(userName);
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const userId = uid;

  const { data: userProfileList } = useDatabaseObjectData<UserCollection>(
    ref(database, `users`),
    { idField: "" }
  );

  const { data: friendData } = useDatabaseObjectData<UserFriendUid>(
    ref(database, `users/` + userId + `/friends`),
    { idField: "" }
  );


  useEffect(() => {

    if (friendData) {
      const leaderboardData: UserProfile[] = [];
      Object.keys(friendData).forEach((key) => {
        get(ref(database, "users/" + friendData[key] + "/profile")).then(
          (snapshot) => {
            if (snapshot.exists()) {
              leaderboardData.push(snapshot.val());
            }
          }
        );
      });

      setLeaderboard(leaderboardData);
    }
  }, [friendData]);

  return (
    <>
      <IonListHeader> Friends Only Leaderboard </IonListHeader>


      <IonList>
        {leaderboard
          ?.sort(function (a, b) {
            return b.totalPoint - a.totalPoint;
          })
          ?.map((profile) => (
            <IonItem key={profile.userUid}>
              <IonText>
                <h3> {profile.userName} </h3>{" "}
                <p>Total Point : {profile.totalPoint} </p>
              </IonText>
            </IonItem>
          ))}
      </IonList>
    </>
  );
}

export default UserList;
