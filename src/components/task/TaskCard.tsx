import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import {  query } from "firebase/database";
import { useContext } from "react";
import {  readTaskRef } from "firebase/taskFunction";
import { useDatabaseListData, useDatabaseObjectData } from "reactfire";
import { dateFormat } from "utils/dateFormat";
import { TaskCollection } from "components/types/task";

function TaskCard() {
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const currentUserTaskRef = readTaskRef(String(uid));

  const { data: taskList } = useDatabaseObjectData<TaskCollection>(currentUserTaskRef, {
    idField: ""
  });

  return (
    <IonContent>
      { console.log(taskList)}
      {taskList&& Object.keys(taskList).map((key,index) => (
        <IonCard key={key}>
          {console.log(key)}
          <IonCardHeader>
            <IonCardSubtitle> {dateFormat(taskList[key].time)} </IonCardSubtitle>
            <IonCardTitle> {taskList[key].name} </IonCardTitle>
            {" "}
            <IonCardSubtitle> {taskList[key].category} </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      ))}
    </IonContent>
  );
}

export default TaskCard;
