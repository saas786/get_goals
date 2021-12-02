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
import { TextareaChangeEventDetail } from "@ionic/core";
import React, { MouseEventHandler, useEffect, useState } from "react";

import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./Home.css";

import List from "components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(list));
  } else {
    return [];
  }
};

const Home: React.FC = () => {
  const [name, setName] = useState<string | null>();
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit: MouseEventHandler<HTMLIonButtonElement> = (e) => {
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item: { id: null }) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({
      show,
      type,
      msg,
    });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id: string) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item: { id: string }) => item.id !== id));
  };

  const editItem = (id: any) => {
    const specificItem = list.find((item: any) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const handleChangeInput = (e: CustomEvent<TextareaChangeEventDetail>) => {
    setName(e.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
              <IonTextarea
                value={name}
                placeholder="Input your todo list here"
                onIonChange={handleChangeInput}
              />

              <IonButton onClick={handleSubmit} type="submit">
                {isEditing ? "edit" : "submit!"}
              </IonButton>
            </IonCol>
          </IonRow>

          <List items={list} removeItem={removeItem} editItem={editItem} />
        </IonGrid>
        {/* <AuthModal /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
