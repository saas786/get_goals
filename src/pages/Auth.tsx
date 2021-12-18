import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import AuthModal from "components/auth/AuthModal";


const Auth: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome!</IonTitle>
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
