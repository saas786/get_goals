import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonTitle,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { useContext, useMemo } from "react";
import { useDatabaseObjectData } from "reactfire";
import { readShopItemRef } from "firebase/itemFunction";
import { Shop } from "components/types/shop";
import { UserAchievement, UserCollection } from "components/types/profile";
import { child, get, push, ref, update } from "firebase/database";
import { database, dbRef } from "firebase/firebaseConfig";
import { presentToast } from "components/Toast";
import { readUserRef } from "firebase/profileFunction";

function ItemCard() {
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const shopRef = readShopItemRef;
  const currentUserProfileRef = readUserRef(String(uid));

  const { data: userProfile } = useDatabaseObjectData<UserCollection>(
    currentUserProfileRef,
    { idField: "" }
  );

  const { data: userAchievementData } = useDatabaseObjectData<UserAchievement>(
    ref(database, `users/` + uid + `/achievements`),
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

  const buyItem = (itemName: string, itemPrice: number) => () => {
    // GET USER POINT -> CALCULATE -> SET TO PROFILE
    get(child(dbRef, `users/` + uid + "/profile/currentPoint")).then(
      (point) => {
        if (point.exists()) {
          let check = 0;
          let userPoint = point.val() - itemPrice;
          if (userPoint < 0) {
            presentToast("Not Enough Point");
          } else {
            // CHECK USER IF ALREADY HAVE
            Object.keys(userAchievementData).forEach((key) => {
              if (userAchievementData[key] === itemName) {
                check = 1;
              }
            });

            if (check === 0) {
              push(
                child(ref(database, `users/` + uid), `achievements`),
                itemName
              );
              update(ref(database), {
                ["/users/" + uid + "/profile/currentPoint"]: userPoint,
              });
              presentToast("Transaction Complete!");
            } else {
              presentToast("You Already Have It");
            }
          }
        }
      }
    );
  };

  return (
    <>
      {userProfile &&
        [Object.keys(userProfile)[0]].map((key) => (
          <IonCard key={key}>
            <IonCardHeader>
              <IonCardTitle>
                {" "}
                Current Point : {userProfile.currentPoint}{" "}
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ))}

      <IonTitle>Title Store</IonTitle>
      {shopItems &&
        Object.keys(shopItems).map((key) => (
          <IonCard key={key}>
            <IonCardHeader>
              <IonCardTitle>{shopItems[key].name}</IonCardTitle>
              <IonCardSubtitle>{shopItems[key].desc}</IonCardSubtitle>
            </IonCardHeader>
            <IonItem>
              <IonLabel>Price: {shopItems[key].price}</IonLabel>
              <IonButton
                onClick={buyItem(
                  String(shopItems[key].name),
                  shopItems[key].price
                )}
              >
                Buy
              </IonButton>
            </IonItem>
          </IonCard>
        ))}
    </>
  );
}

export default ItemCard;
