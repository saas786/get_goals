import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { useContext, useMemo } from "react";
import { readTaskRef } from "firebase/taskFunction";
import { useDatabaseObjectData } from "reactfire";
import { TaskCollection } from "components/types/task";
import { readShopItemRef } from "firebase/itemFunction";
import { Shop } from "components/types/shop";
import { UserAchievement } from "components/types/profile";
import { ref } from "firebase/database";
import { database } from "firebase/firebaseConfig";

function ItemCard() {
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const shopRef = readShopItemRef;

  const { data: userAchievementData } = useDatabaseObjectData<UserAchievement>(
    ref(database, `user/` + uid + `/achievment`),
    { idField: "" }
  );

  const { data: shopItems } = useDatabaseObjectData<Shop>(shopRef, {
    idField: "",
  });

  const userAchievementList = useMemo(() => {
    if (!userAchievementData) {
      return [];
    }
    return Object.keys(userAchievementData).map(
      (key) => userAchievementData[key]
    );
  }, [userAchievementData]);

  return (
    <>
      {shopItems &&
        Object.keys(shopItems).map((key) => (
          <IonCard key={key}>
            <IonCardHeader>
              <IonCardTitle>{shopItems[key].name}</IonCardTitle>
              <IonCardSubtitle>{shopItems[key].desc}</IonCardSubtitle>
            </IonCardHeader>
            <IonItem>
              <IonLabel>Price: {shopItems[key].price}</IonLabel>
              <IonButton>Buy</IonButton>
            </IonItem>
          </IonCard>
        ))}
    </>
  );
}

export default ItemCard;
