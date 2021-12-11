import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ProfileCard from "components/leaderboard/ProfileCard";

const Leaderboard: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Main App</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
          <ProfileCard />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Leaderboard;