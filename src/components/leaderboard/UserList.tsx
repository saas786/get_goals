import {
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { UserCollection } from "components/types/profile";
import { orderByChild, orderByValue, query, ref } from "firebase/database";
import { database } from "firebase/firebaseConfig";
import {
  useDatabase,
  useDatabaseListData,
  useDatabaseObjectData,
} from "reactfire";

function UserList() {
  const usersRef = ref(database, "users");
  // const userQuery = query(usersRef, orderByChild('profile'));

  // const {data: userProfileArray} = useDatabaseListData(userQuery, {
  //   idField: ""
  // })

  const { data: userProfileList } = useDatabaseObjectData<UserCollection>(
    ref(database, `users`),
    { idField: "" }
  );

  // const sorted = Object.keys(userProfileList).sort(function (a, b) {
  //   return userProfileList[b].totalPoint - userProfileList[a].totalPoint;
  // });

  // const result = Object.keys(userProfileList).sort((a,b) => userProfileList[a].totalPoint- userProfileList[b].totalPoint);

  return (
    <>
      <IonListHeader> Point Leaderboard </IonListHeader>
      {console.log(userProfileList)}
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
    </>
  );
}

export default UserList;
