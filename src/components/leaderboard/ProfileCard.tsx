import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonModal,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { UserCollection } from "components/types/profile";
import { readUserRef } from "firebase/profileFunction";
import { useContext, useState } from "react";
import { useDatabaseObjectData } from "reactfire";

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
      {userProfile &&
        [Object.keys(userProfile)[0]].map((key) => (
          <IonCard key={key}>
            <IonCardHeader>
              <IonCardTitle> {userProfile.userName} </IonCardTitle>
              <IonCardSubtitle>
                {" "}
                {userProfile.achievement}{" "}
              </IonCardSubtitle>
              <IonCardSubtitle>
                {" "}
                User Id : {userProfile.userUid}{" "}
              </IonCardSubtitle>
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
