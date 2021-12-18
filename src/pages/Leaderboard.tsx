import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import EditProfile from "components/leaderboard/EditProfile";
import ProfileCard from "components/leaderboard/ProfileCard";
import UserList from "components/leaderboard/UserList"

const Leaderboard: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Leaderboard</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
          <ProfileCard />
          <EditProfile />
          <UserList />
        </IonContent>
        
      </IonPage>
    );
  };
  
  export default Leaderboard;