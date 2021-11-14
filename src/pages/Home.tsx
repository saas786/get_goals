import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonGrid, IonRow, IonCol} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit{}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
            <IonButton color="primary" >Primary</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
