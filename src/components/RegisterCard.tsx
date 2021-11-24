// import './ExploreContainer.css';
import { dismiss } from "@ionic/core/dist/types/utils/overlays";
import { IonButton, IonContent, IonPage, useIonModal } from "@ionic/react";

interface ContainerProps {}

// type ListProps = {
//     items : Array<ToDoItem>;
//     removeItem : (id: string) => void;
//     editItem : (id: string) => void;
// }

// type ListModalCommand = {
//   modalDismiss: () => void;
//   modalPresent: () => void;
// };

// const RegisterCard = ({ modalDismiss, modalPresent }: ListModalCommand) => {
//   const [present, dismiss] = useIonModal(RegisterCard, {
//     onDismiss: modalDismiss(),
//     onPresent: modalPresent(),
//   });

//   return (
//     <div className="container">
//       {/* <strong>Ready to create an app?</strong>
//       <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p> */}
//     </div>
//   );
// };

// const RegisterCard: React.FC<{
//     onDismiss: () => void;
// }> = ({onDismiss}) => ( 
//     <div>
//         <IonButton>CLICK</IonButton>
//     </div>
// );

// const Modal: React.FC = () => {
//     const handleDismiss = () => {
//         dismiss();
//     };

//       const [present, dismiss] = useIonModal(RegisterCard, {
//     onDismiss: handleDismiss(),
//   });
// }

// export default RegisterCard;

