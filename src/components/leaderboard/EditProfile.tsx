import { present } from "@ionic/core/dist/types/utils/overlays";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import { child, get, ref, set, update } from "firebase/database";
import { database, dbRef } from "firebase/firebaseConfig";
import { readUserRef } from "firebase/profileFunction";
import { useContext, useState } from "react";
import { useDatabaseObjectData } from "reactfire";

function EditProfile() {
  const [showEditProfile, SetShowEditProfile] = useState(false);
  const [showEditArchievment, SetshowEditArchievment] = useState(false);
  const [name, setName] = useState<string>("");
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const currentUserProfileRef = readUserRef(String(uid));

  const ChangeName = async () => {
    get(child(dbRef, `users/` + uid + `/profile/userName`)).then((snapshot) => {
      if (snapshot.exists() && snapshot.val() !== name) {
        update(ref(database), {
          ["/users/" + uid + "/profile/userName"]: name,
        });
        presentToast("Name Changed");
      }
      return SetShowEditProfile(false);
    });
  };

  return (
    <>
      <IonButton onClick={() => SetShowEditProfile(true)}> EDIT NAME</IonButton>
      <IonButton onClick={() => SetshowEditArchievment(true)}>
        {" "}
        CHANGE ARCHIEVMENT
      </IonButton>

      <IonModal isOpen={showEditProfile}>
        <IonHeader>
          <IonLabel>Change Name</IonLabel>
        </IonHeader>
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            onIonChange={(e) => setName(e.detail.value!)}
            value={name}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton expand="block" onClick={ChangeName}>
            EDIT!
          </IonButton>
          <IonButton expand="block">Cancel</IonButton>
        </IonItem>
      </IonModal>
    </>
  );
}

export default EditProfile;
