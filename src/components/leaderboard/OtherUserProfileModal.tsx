import { async } from "@firebase/util";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { presentToast } from "components/Toast";
import { UserCollection } from "components/types/profile";
import { child, Database, get, ref, remove, set } from "firebase/database";
import { dbRef, database } from "firebase/firebaseConfig";
import { readUserRef } from "firebase/profileFunction";
import { useContext, useState } from "react";
import { useDatabaseObjectData } from "reactfire";

export const OtherUserProfileModal= async (userId: string) => {
  const [showOtherUserModal, setShowOtherUserModal] = useState(false);
  const currentUserProfileRef = readUserRef(String(userId));

  const { data: userProfile } = useDatabaseObjectData<UserCollection>(
    currentUserProfileRef,
    { idField: "" }
  );

  const addFriend = (friendId: string) => () => {
    get(child(dbRef, `users/` + userId + "/friends/" + friendId)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val);
        } else {
          set(ref(database, `users/` + userId + `/friends`), {
            friendId: 1,
          });
        }
      }
    );
  };

  const removeFriend = (friendId: string) => () => {
    get(child(dbRef, `users/` + userId + "/friends/" + friendId)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, `users/` + userId + "/friends/" + friendId));
        } else {
          presentToast("Not In Your Friendlist");
        }
      }
    );
  };

  return (
    <>
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

            <IonButton onClick={addFriend(String(userProfile.userUid))}>
              Add Friend
            </IonButton>
            <IonButton onClick={removeFriend(String(userProfile.userUid))}>
              Remove Friend
            </IonButton>
          </IonModal>
        ))}
    </>
  );
}

export default OtherUserProfileModal;
