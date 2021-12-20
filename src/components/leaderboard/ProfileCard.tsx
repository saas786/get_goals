import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonModal,
  IonTitle,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { UserCollection } from "components/types/profile";
import { readUserRef } from "firebase/profileFunction";
import { useContext, useState } from "react";
import { useDatabaseObjectData } from "reactfire";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ProfileCard() {
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const currentUserProfileRef = readUserRef(String(uid));

  const { data: userProfile } = useDatabaseObjectData<UserCollection>(
    currentUserProfileRef,
    { idField: "" }
  );

  return (
    <>
      {console.log(uid)}
      {userProfile &&
        [Object.keys(userProfile)[0]].map((key) => (
          <IonCard key={key}>
            <IonCardHeader>
              <IonCardTitle> {userProfile.userName} </IonCardTitle>
              <IonCardSubtitle> {userProfile.achievement} </IonCardSubtitle>
              <IonCardSubtitle>
                {" "}
                Current Point : {userProfile.currentPoint}{" "}
              </IonCardSubtitle>

              <IonCardSubtitle>
                {" "}
                Total Point : {userProfile.totalPoint}{" "}
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ))}
    </>
  );
}

export default ProfileCard;
