import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { presentToast } from "components/Toast";
import { child, get, onValue, ref } from "firebase/database";
import { database } from "firebase/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { TaskCollection, TaskEntry } from "components/types/task";
import { readAllTask, readTaskRef } from "firebase/taskFunction";


function TaskCard() {
  const currentUserUid = useContext(AuthContext);
  const uid = String(currentUserUid.currentUser);
  const [tasks, setTask] = useState<TaskCollection>(Object);
  const currentUserTaskRef = readTaskRef(uid);


  // will run once at the beginning to turn on listener to RTDB
  useEffect(() => {
    onValue(currentUserTaskRef, (snapshot) => {
      // type-casting with as
      setTask(snapshot.val() as TaskCollection);
    });
  }, []);

  return (
    <IonContent>
      {Object.keys(tasks).map((taskKey: any) => (
        <IonCard key={taskKey}>
          <IonCardHeader>
            <IonCardSubtitle>{tasks[taskKey].time}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      ))}
    </IonContent>
  );

  // const task = props.task;
  // const cardOfTask = tasks.map((task: any) => {
  // <IonCard>
  //   <IonCardHeader>
  //     <IonCardSubtitle>
  //       {" "}
  //       {task.date} {task.time}{" "}
  //     </IonCardSubtitle>
  //     <IonCardTitle onClick={present}> {task.name}</IonCardTitle>
  //   </IonCardHeader>
  //   <IonCardContent>{task.Category}</IonCardContent>
  //   <IonButton color="success">Completed</IonButton>
  //   <IonButton color="danger">Delete</IonButton>
  // </IonCard>;
  // });
}

export default TaskCard;
