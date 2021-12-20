import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ItemCard from "components/shop/ItemCard";

const Shop: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ItemCard />
      </IonContent>
    </IonPage>
  );
};

export default Shop;
