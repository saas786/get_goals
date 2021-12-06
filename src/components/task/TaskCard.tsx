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
import { child, get, ref } from "firebase/database";
import { database } from "firebase/firebaseConfig";
import { useContext } from "react";


  const dbRef = ref(database);
  const currentUserUid = useContext(AuthContext);
  let tasks = new Array<Object>();

 function TaskCard(props: any){
  const task = props.task;
  const cardOfTask = tasks.map((task: any) => {
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          {" "}
          {task.date} {task.time}{" "}
        </IonCardSubtitle>
        <IonCardTitle onClick={present}> {task.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{task.Category}</IonCardContent>

      <IonButton color="success">Completed</IonButton>
      <IonButton color="danger">Delete</IonButton>
    </IonCard>;
  });

  return cardOfTask;
  };

  const GetTask = (item: object) => {
    get(child(dbRef, `users/` + currentUserUid.currentUser + `/task/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        tasks = snapshot.val();
        return tasks;
      } else {
        console.log("empty");
      }
    }) .catch((error) => {
      console.log(error);
    })
    
  }

  const present = () => {
    presentToast("CLICKED");
  };

  export default TaskCard;