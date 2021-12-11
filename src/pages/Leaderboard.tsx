import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ProfileCard from "components/leaderboard/ProfileCard";
import UserList from "components/leaderboard/UserList"

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
          <UserList />
        </IonContent>
        
      </IonPage>
    );
  };
  
  export default Leaderboard;