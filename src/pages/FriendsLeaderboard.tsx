import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import FriendUserList from "components/leaderboard/FriendUserList";
import ProfileCard from "components/leaderboard/ProfileCard";
import UserList from "components/leaderboard/UserList"

const FriendsLeaderboard: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Friends Leaderboard</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
          <ProfileCard />
          <FriendUserList />
        </IonContent>
        
      </IonPage>
    );
  };
  
  export default FriendsLeaderboard;