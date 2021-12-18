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
import { User, UserCollection, UserFriendUid } from "components/types/profile";
import { UserProfile } from "firebase/auth";
import { child, get, push, ref, remove, set } from "firebase/database";
import { database, dbRef } from "firebase/firebaseConfig";
import { readuserFriend, readUserRef } from "firebase/profileFunction";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDatabaseObjectData } from "reactfire";

type Filter = "global" | "friends";

function UserList() {
  const [userName, setUsername] = useState<string>("");
  const currentUserProfileRef = readUserRef(userName);
  const [filter, setFilter] = useState<Filter>("global");
  const [showOtherUserModal, setShowOtherUserModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const userId = uid;

  const { data: userProfile } = useDatabaseObjectData<UserProfile>(
    currentUserProfileRef,
    { idField: "" }
  );

  const { data: userProfileList } = useDatabaseObjectData<UserCollection>(
    ref(database, `users`),
    { idField: "" }
  );

  const { data: friendData } = useDatabaseObjectData<UserFriendUid>(
    ref(database, `users/` + userId + `/friends`),
    { idField: "" }
  );

  const friendIds = useMemo(() => {
    if (!friendData) {
      return [];
    }
    return Object.keys(friendData).map((key) => friendData[key]);
  }, [friendData]);

  const addFriend = (friendId: string, totalPoint: number) => () => {
    const id = friendId;
    get(child(dbRef, `users/` + userId + "/friends/" + friendId)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          presentToast("Already following user");
        } else {
          push(child(ref(database, `users/` + userId), `friends`), id);
          presentToast("Yay, new friend!");
        }
      }
    );
  };

  const removeFriend = (friendId: string) => () => {
    get(child(dbRef, `users/` + userId + "/friends")).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((iterator) => {
          if (iterator.val() == friendId) {
            remove(
              ref(database, `users/` + userId + "/friends/" + iterator.key)
            );
          }
        });
        presentToast("Oh.. okay");
      } else {
        presentToast("Not In Your Friendlist");
      }
    });
  };

  async function showProfileModal() {
    setShowOtherUserModal(true);
  }

  return (
    <>
      <IonListHeader> Point Leaderboard </IonListHeader>
      <IonItem>
        <IonLabel>Search Friends: </IonLabel>
        <IonInput
          onIonChange={(e) => setUsername(e.detail.value!)}
          value={userName}
          placeholder="Please Include the -"
        ></IonInput>

        <IonButton onClick={showProfileModal}>Search</IonButton>
      </IonItem>

      <IonSegment
        onIonChange={(e) => setFilter(e.detail.value as Filter)}
        value={filter}
      >
        <IonSegmentButton value="global">Global</IonSegmentButton>
        <IonSegmentButton value="friends">Friends</IonSegmentButton>
      </IonSegment>

      <IonList>
        {Object.keys(userProfileList ?? {})
          ?.filter((key) => {
            if (filter === "friends") {
              return friendIds.includes(key);
            }
            return true;
          })
          ?.sort(function (a, b) {
            return (
              userProfileList[b].profile.totalPoint -
              userProfileList[a].profile.totalPoint
            );
          })
          ?.map((key) => (
            <IonItem key={key}>
              <IonText>
                <h3> {userProfileList[key].profile.userName} </h3>{" "}
                <p>Total Point : {userProfileList[key].profile.totalPoint} </p>
              </IonText>
            </IonItem>
          ))}
      </IonList>

      {userProfile &&
        [Object.keys(userProfile)[0]].map((key) => (
          <IonModal isOpen={showOtherUserModal}>
            <IonHeader>
              <p>User Profile</p>
            </IonHeader>

            <IonContent>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  readonly
                  value={String(userProfile.userName)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  readonly
                  value={String(userProfile.userEmail)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">totalPoint</IonLabel>
                <IonInput
                  readonly
                  value={String(userProfile.totalPoint)}
                ></IonInput>
              </IonItem>
            </IonContent>

            <IonButton
              onClick={addFriend(
                String(userProfile.userUid),
                Number(userProfile.totalPoint)
              )}
            >
              Add Friend
            </IonButton>
            <IonButton onClick={removeFriend(String(userProfile.userUid))}>
              Remove Friend
            </IonButton>
            <IonButton onClick={() => setShowOtherUserModal(false)}>
              Close
            </IonButton>
          </IonModal>
        ))}
    </>
  );
}

export default UserList;
