import {
  IonButton,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState, useContext } from "react";
import { database } from "firebase/firebaseConfig";
import { AuthContext, UserContext } from "components/providers/UserContext";
import { ref, child, get, DataSnapshot, set, query } from "@firebase/database";
import { presentToast } from "components/Toast";
import { nanoid } from "nanoid";
import { readTaskRef } from "firebase/taskFunction";
import { useDatabaseListData, useDatabaseObjectData } from "reactfire";

export const TaskModal: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const currentUserUid = useContext(AuthContext);



  // 
  // const uid = currentUserUid.currentUser;
  // const currentUserTaskRef = readTaskRef(String(uid));
  // const { status, data: taskList} = useDatabaseListData(query(currentUserTaskRef), {
    
  // })


  // 

  const CreateTask = async () => {
    if (
      selectedTime === "" ||
      name === "" ||
      category === ""
    ) {
      // console.log(taskList);
      presentToast(" All Field Required ");
    } else {
      const userUid = currentUserUid.currentUser;
      const taskId = nanoid()

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
    <IonContent>
      <IonModal isOpen={showTaskModal}>
        <p> Create Task </p>
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
        </IonItem>
      </IonModal>

      <IonButton onClick={() => setShowTaskModal(true)}>Create Task</IonButton>
    </IonContent>
  );
};

export default TaskModal;
