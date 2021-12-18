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
import OtherUserProfileModal from "./OtherUserProfileModal";

function SearchFriend() {
  const [userName, setUsername] = useState<string>("")
  
  return (
      <IonItem>
          {/* <IonLabel>Search Friends</IonLabel>
          <IonInput value={userName} onIonChange={(e) => setUsername(e.detail.value!)} placeholder="Please Include the #!"></IonInput>
          <IonButton onClick={OtherUserProfileModal(userName)}></IonButton> */}
      </IonItem>
    

  )
  
    
  
}

export default SearchFriend;
