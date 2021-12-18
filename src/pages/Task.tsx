import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
} from "@ionic/react";
import TaskCard from "components/task/TaskCard";

import TaskModal from "components/task/TaskModal";

const Task: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quest</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TaskCard />
        <TaskModal />
      </IonContent>
    </IonPage>
  );
};

export default Task;
