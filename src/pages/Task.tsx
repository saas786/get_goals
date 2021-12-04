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
  
  import TaskModal from "components/task/TaskModal";
  
  
  const Task: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Main App</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          {" "}
          <TaskModal />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Task;
  