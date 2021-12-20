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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  registerUser,
  loginUser,
  checkLoginUser,
  logoutUser,
} from "firebase/userFunction";
import { AuthContext } from "components/providers/UserContext";
import { presentToast } from "components/Toast";
import { UserAchievement } from "components/types/profile";
import { Shop } from "components/types/shop";
import { child, get, push, ref, set, update } from "firebase/database";
import { database, dbRef } from "firebase/firebaseConfig";
import { readShopItemRef } from "firebase/itemFunction";
import { useContext, useMemo, useState } from "react";
import { useDatabaseObjectData } from "reactfire";
import CopyToClipboard from "react-copy-to-clipboard";

function EditProfile() {
  const [showEditProfile, SetShowEditProfile] = useState(false);
  const [showEditArchievment, SetshowEditArchievment] = useState(false);
  const [name, setName] = useState<string>("");
  const [achievement, setAchievement] = useState<string>("");
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const shopRef = readShopItemRef;

  const { data: userAchievementData } = useDatabaseObjectData<UserAchievement>(
    ref(database, `users/` + uid + `/achievements`),
    { idField: "" }
  );

  const ChangeName = async () => {
    get(child(dbRef, `users/` + uid + `/profile/userName`)).then((snapshot) => {
      if (snapshot.val() !== name && name) {
        update(ref(database), {
          ["/users/" + uid + "/profile/userName"]: name,
        });
        presentToast("Name Changed");
      } else {
        push(
          child(ref(database, `users/` + uid), `achievements`),
          "Cancel the change"
        );
        presentToast("uh oh?");
      }
      return SetShowEditProfile(false);
    });
  };

  async function logoutClick() {
    logoutUser();
  }

  const ChangeAchievement = async () => {
    if (achievement) {
      update(ref(database), {
        ["/users/" + uid + "/profile/achievement"]: achievement,
      });

      return SetshowEditArchievment(false)
    }
  };

  return (
    <>
      <IonButton onClick={() => SetShowEditProfile(true)}> EDIT NAME</IonButton>
      <IonButton onClick={() => SetshowEditArchievment(true)}>
        {" "}
        CHANGE ARCHIEVMENT
      </IonButton>
      <IonButton onClick={logoutClick}>Log Out</IonButton>
      <CopyToClipboard text={String(uid)}>
        <IonButton>Get Code</IonButton>
      </CopyToClipboard>

      <IonModal isOpen={showEditProfile}>
        <IonHeader>
          <IonLabel>Change Name</IonLabel>
        </IonHeader>
        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput
            placeholder="Leave it blank for cancel"
            onIonChange={(e) => setName(e.detail.value!)}
            value={name}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton expand="block" onClick={ChangeName}>
            EDIT!
          </IonButton>
          <IonButton onClick={() => SetShowEditProfile(false)} expand="block">
            Cancel
          </IonButton>
        </IonItem>
      </IonModal>

      <IonModal isOpen={showEditArchievment}>
        <IonHeader>
          <IonLabel>Change Title</IonLabel>
        </IonHeader>
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <IonSelect
            value={achievement}
            onIonChange={(e) => setAchievement(e.detail.value!)}
          >
            {userAchievementData &&
              Object.keys(userAchievementData).map((key) => (
                <IonSelectOption>{userAchievementData[key]}</IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonButton onClick={ChangeAchievement}>Set Title</IonButton>
          <IonButton onClick={() => SetshowEditArchievment(false)}>
            Cancel
          </IonButton>
        </IonItem>
      </IonModal>
    </>
  );
}

export default EditProfile;
