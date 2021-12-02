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

import AuthModal from "components/auth/AuthModal";


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
