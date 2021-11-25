import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonList,
  IonItemDivider,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react";

export const RegisterModal: React.FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <IonContent>
      <IonModal isOpen={showRegisterModal}>
        <p>Register</p>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={name}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={email}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password}></IonInput>
          </IonItem>
        </IonList>
        <IonButton onClick={() => setShowRegisterModal(false)}>
          Register
        </IonButton>
      </IonModal>

      <IonModal isOpen={showLoginModal}>
        <p>Login</p>
        
        <IonList>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={email}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password}></IonInput>
          </IonItem>
        </IonList>

        <IonButton onClick={() => setShowLoginModal(false)}>Login</IonButton>
      </IonModal>

      <IonButton onClick={() => setShowRegisterModal(true)}>Register</IonButton>
      <IonButton onClick={() => setShowLoginModal(true)}>Login</IonButton>
    </IonContent>
  );
};

export default RegisterModal;
