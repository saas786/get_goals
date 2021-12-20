import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { useContext, useEffect } from "react";
import { readTaskRef } from "firebase/taskFunction";
import { useDatabaseObjectData } from "reactfire";
import { dateFormat } from "utils/dateFormat";
import { TaskCollection } from "components/types/task";
import { remove, update } from "@firebase/database";
import { database, dbRef } from "firebase/firebaseConfig";
import { child, get, push, ref } from "firebase/database";
import { presentToast } from "components/Toast";

function TaskCard() {
  const currentUserUid = useContext(AuthContext);
  const uid = currentUserUid.currentUser;
  const currentUserTaskRef = readTaskRef(String(uid));

  const { data: taskList } = useDatabaseObjectData<TaskCollection>(
    currentUserTaskRef,
    {
      idField: "",
    }
  );

  const setUserPoint = () => {
    const point = 10;
    get(child(dbRef, `users/${uid}/profile/currentPoint`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentPoint = snapshot.val();
        const totalCurrentPoint = currentPoint + point;

        update(ref(database), {
          ["/users/" + uid + "/profile/currentPoint"]: totalCurrentPoint,
        });
      } else {
        update(ref(database), {
          ["/users/" + uid + "/profile/currentPoint"]: point,
        });
      }
    });

    get(child(dbRef, `users/${uid}/profile/totalPoint`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentPoint = snapshot.val();
        const totalCurrentPoint = currentPoint + point;

        update(ref(database), {
          ["/users/" + uid + "/profile/totalPoint"]: totalCurrentPoint,
        });
      } else {
        update(ref(database), {
          ["/users/" + uid + "/profile/totalPoint"]: point,
        });
      }
    });

    get(child(dbRef, `users/${uid}/profile/clearedTask`)).then((snapshot) => {
      if (snapshot.exists()) {
        update(ref(database), {
          ["/users/" + uid + "/profile/clearedTask"]: snapshot.val() + 1,
        });
      }
    });
  };

  const removeTask = (key: string) => () => {
    remove(ref(database, `users/` + uid + "/tasks/" + key));

    presentToast("Task Removed");
  };

  const completedTask = (key: string) => () => {
    remove(ref(database, `users/` + uid + "/tasks/" + key));
    setUserPoint();

    presentToast("Task Completed!");
  };

  useEffect(() => {
    get(child(dbRef, `users/${uid}/profile/clearedTask`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() === 1) {
          push(
            child(ref(database, `users/` + uid), `achievements`),
            "I have done my 1st task!"
          );
        } else if (snapshot.val() === 10) {
          push(
            child(ref(database, `users/` + uid), `achievements`),
            "I Think im getting used to it!"
          );
        } else if (snapshot.val() === 30) {
          push(
            child(ref(database, `users/` + uid), `achievements`),
            "No One Can Stop Me!"
          );
        }
      }
    });
  }, [taskList]);

  return (
    <>
      {taskList &&
        Object.keys(taskList).map((key) => (
          <IonCard key={key}>
            <IonCardHeader>
              <IonCardSubtitle>
                {" "}
                {dateFormat(taskList[key].time)}{" "}
              </IonCardSubtitle>
              <IonCardTitle> {taskList[key].name} </IonCardTitle>{" "}
              <IonCardSubtitle> {taskList[key].category} </IonCardSubtitle>
            </IonCardHeader>

            <IonButton onClick={removeTask(key)}>DELETE</IonButton>
            <IonButton onClick={completedTask(key)}>DONE</IonButton>
          </IonCard>
        ))}
    </>
  );
}

export default TaskCard;
