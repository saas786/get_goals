import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState, useContext } from "react";
import { database } from "firebase/firebaseConfig";
import { AuthContext } from "components/providers/UserContext";
import { ref, set } from "@firebase/database";
import { presentToast } from "components/Toast";
import { nanoid } from "nanoid";

export const TaskModal: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const currentUserUid = useContext(AuthContext);

  const CreateTask = async () => {
    if (selectedTime === "" || name === "" || category === "") {
      presentToast(" All Field Required ");
    } else {
      const userUid = currentUserUid.currentUser;
      const taskId = nanoid();

      set(ref(database, "users/" + userUid + "/tasks/" + taskId), {
        name: name,
        category: category,
        time: selectedTime,
      });

      return true;
    }
  };

  async function taskModalClick() {
    const registerTaskResult = await CreateTask();
    if (registerTaskResult == true) {
      presentToast("Task Created");
      setShowTaskModal(false);
    }
  }

  return (
    <>    
      <IonModal isOpen={showTaskModal}>
        <IonHeader>
          <p> Create Task </p>
        </IonHeader>

        <IonContent>
        <IonItem>
          <IonLabel position="floating">Task</IonLabel>
          <IonInput
            onIonChange={(e) => setName(e.detail.value!)}
            value={name}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Select Category</IonLabel>
          <IonSelect
            interface="popover"
            value={category}
            onIonChange={(e) => setCategory(e.detail.value)}
          >
            <IonSelectOption value="Fun">Fun</IonSelectOption>
            <IonSelectOption value="Development">Development</IonSelectOption>
            <IonSelectOption value="Work">Work</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Select Time</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY HH:mm"
            value={selectedTime}
            onIonChange={(e) => setSelectedTime(e.detail.value!)}
          ></IonDatetime>
        </IonItem>

        <IonItem>
          <IonButton onClick={taskModalClick}>Create Task</IonButton>
          <IonButton onClick={() => setShowTaskModal(false)}>Close</IonButton>
        </IonItem>

        </IonContent>
      </IonModal>

      <IonButton onClick={() => setShowTaskModal(true)}>Create Task</IonButton>
     
    </>
  );
};

export default TaskModal;
