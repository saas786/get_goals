import {
  IonButton,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState, useContext } from "react";
import { database } from "firebase/firebaseConfig";
import { getCurrentUser } from "firebase/userFunction";
import { AuthContext, Context } from "components/Context";
import { ref, child, get, DataSnapshot, set } from "@firebase/database";
import { async } from "@firebase/util";
import { userInfo } from "os";
import Moment from "moment";

export const TaskModal: React.FC = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const currentUserUid = useContext(AuthContext);

  const CreateTask = async () => {
    const userUid = currentUserUid.currentUser;
    const formattedDate = Moment(selectedDate).format("DD-MM-YYYY");
    const formattedTime = Moment(selectedTime).format("HH:mm");
    set(ref(database, "users/" + userUid + "/task/"), {
      name: name,
      category: category,
      date: formattedDate,
      time: formattedTime,
    });
  };

  return (
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
        <IonButton onClick={CreateTask}>Create Task</IonButton>
      </IonItem>
    </IonContent>
  );
};

export default TaskModal;
