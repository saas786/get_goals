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
  IonText,
  IonToggle,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { presentToast } from "components/Toast";
import { UserCollection } from "components/types/profile";
import { child, get, ref, remove, set } from "firebase/database";
import { database, dbRef } from "firebase/firebaseConfig";
import { readuserFriend, readUserRef } from "firebase/profileFunction";
import { useContext, useEffect, useState } from "react";
import { useDatabaseObjectData } from "reactfire";

function UserList() {
  const [userName, setUsername] = useState<string>("");
  const currentUserProfileRef = readUserRef(userName);
  const currentUserFriend = readuserFriend(userName);
  const [showOtherUserModal, setShowOtherUserModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const userId = uid;

  const { data: userProfile } = useDatabaseObjectData<UserCollection>(
    currentUserProfileRef,
    { idField: "" }
  );

  const { data: userProfileList } = useDatabaseObjectData<UserCollection>(
    ref(database, `users`),
    { idField: "" }
  );

  const { data: friendData } = useDatabaseObjectData<UserCollection>(
    ref(database, `users/` + userId + `/friends`),
    { idField: "" }
  );

  const addFriend = (friendId: string, totalPoint: number) => () => {
    const id = friendId;
    get(child(dbRef, `users/` + userId + "/friends/" + friendId)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          presentToast("Already following user");
        } else {
          set(ref(database, `users/` + userId + `/friends/` + id), {
            totalPoint: totalPoint,
          });
          presentToast("Yay, new friend!");
        }
      }
    );
  };

  const removeFriend = (friendId: string) => () => {
    get(child(dbRef, `users/` + userId + "/friends/" + friendId)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, `users/` + userId + "/friends/" + friendId));
          presentToast("Oh.. okay");
        } else {
          presentToast("Not In Your Friendlist");
        }
      }
    );
  };

  async function showProfileModal() {
    setShowOtherUserModal(true);
  }

  useEffect(() => {
    if (checked) {
      let userFriend = Object.keys(friendData);
      userFriend.map((index: any) => {
        get(
          child(dbRef, "users/" + userId + "/friends/" + index + "/totalPoint")
        ).then((friendTotalPointSnapshot) => {
          if (friendTotalPointSnapshot.exists()) {
            get(child(dbRef, `users/` + index + "/profile/totalPoint")).then(
              (userTotalPointSnapshot) => {
                if (userTotalPointSnapshot.exists()) {
                  if (
                    friendTotalPointSnapshot.val() !=
                    userTotalPointSnapshot.val()
                  ) {
                    set(
                      ref(database, `users/` + userId + `/friends/` + index),
                      {
                        totalPoint: userTotalPointSnapshot.val(),
                      }
                    );
                  }
                }
              }
            );
          }
        });
      });
    }
  }, [checked]);

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
        <IonButton onClick={showProfileModal}></IonButton>
      </IonItem>

      <IonItem>
        <IonLabel>Show Friends Only</IonLabel>
        <IonToggle
          checked={checked}
          onIonChange={(e) => setChecked(e.detail.checked)}
          color="primary"
        ></IonToggle>
      </IonItem>

      <IonList>
        {Object.keys(userProfileList ?? {})
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
