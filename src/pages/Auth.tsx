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
<<<<<<< HEAD
import { TextareaChangeEventDetail } from "@ionic/core";
import React, { MouseEventHandler, useEffect, useState } from "react";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import ExploreContainer from "components/ExploreContainer";
import "./Home.css";
import List from "components/List";

const Auth: React.FC = () => {
    return (
        <IonPage>
            
        </IonPage>
    );
};

export default Auth;
=======

import AuthModal from "components/AuthModal";

const Auth: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {" "}
        <AuthModal />
      </IonContent>
    </IonPage>
  );
};

export default Auth;
>>>>>>> develop
