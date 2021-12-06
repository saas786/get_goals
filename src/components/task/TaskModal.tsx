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
import { getCurrentUser } from "firebase/userFunction";
import { AuthContext, UserContext } from "components/providers/UserContext";
import { ref, child, get, DataSnapshot, set } from "@firebase/database";
import { async } from "@firebase/util";
import { userInfo } from "os";
import Moment from "moment";
import { presentToast } from "components/Toast";

export const TaskModal: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const currentUserUid = useContext(AuthContext);

  const CreateTask = async () => {
    if (
      selectedDate === "" ||
      selectedTime === "" ||
      name === "" ||
      category === ""
    ) {
      presentToast(" All Field Required ");
    } else {
      const userUid = currentUserUid.currentUser;
      const formattedDate = Moment(selectedDate).format("DD-MM-YYYY");
      const formattedTime = Moment(selectedTime).format("HH:mm");
      const taskId = name.concat(
        "-" + formattedDate + "-" + Math.floor(Math.random() * 900 + 1)
      );

      set(ref(database, "users/" + userUid + "/task/" + taskId), {
        name: name,
        category: category,
        date: formattedDate,
        time: formattedTime,
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
          <IonLabel position="floating">Select Date</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            min="1994-03-14"
            max="2222-12-09"
            value={selectedDate}
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Select Time</IonLabel>
          <IonDatetime
            displayFormat="HH:mm"
            min="00:00"
            max="23:59"
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
