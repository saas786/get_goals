import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react";
import {
  registerUser,
  loginUser,
  checkLoginUser,
  logoutUser,
} from "firebase/userFunction";
import { checkLength } from "components/CheckLength";
import { presentToast } from "components/Toast";

export const RegisterModal: React.FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async () => {
    if (password === "" || email === "" || name === "") {
      //SET ERROR TOAST
      presentToast("DO NOT LEAVE ALL BLANK");
      return false;
    } else {
      const passLength = checkLength(password);

      if (passLength === true) {
        const registered = await registerUser(name, email, password);

        if (registered !== null) {
          console.log("REGISTER SUCESSFULL");
          return true;
        }
      } else {
        presentToast("PASSWORD NEED TO BE MORE THAN 6 CHARACTERS");
        return false;
      }
    }
  };

  const login = async () => {
    if (password === "" || email === "") {
      //set error toast
      console.log("KOSONG!!!!");
      return false;
    } else {
      const login = await loginUser(email, password);

      if (login !== null) {
        //set sucessfull toast
        return true;
      }
    }
  };

  const check = async () => {
    const user = await checkLoginUser();
    return user;
  };

  const logout = async () => {
    const user = await logoutUser();
  };

  async function registerClick() {
    const registerResult = await register();
    if (registerResult == true) {
      setShowRegisterModal(false);
    }
  }

  async function loginClick() {
    const loginResult = await login();
    if (loginResult == true) {
      setShowLoginModal(false);
    }
  }

  async function checkUserClick() {
    const user = await check();
    return true;
  }

  async function logoutClick() {
    const user = await logout();
    return true;
  }

  return (
    <IonContent>
      <IonModal isOpen={showRegisterModal}>
        <p>Register</p>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              onIonChange={(e) => setName(e.detail.value!)}
              value={name}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              onIonChange={(e) => setEmail(e.detail.value!)}
              value={email}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              onIonChange={(e) => setPassword(e.detail.value!)}
              type="password"
              value={password}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonButton expand="block" onClick={registerClick}>
            Register
          </IonButton>
          <IonButton expand="block" onClick={() => setShowRegisterModal(false)}>
            Cancel
          </IonButton>
        </IonList>
      </IonModal>

      <IonModal isOpen={showLoginModal}>
        <p>Login</p>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              onIonChange={(e) => setEmail(e.detail.value!)}
              value={email}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              onIonChange={(e) => setPassword(e.detail.value!)}
              type="password"
              value={password}
            ></IonInput>
          </IonItem>
        </IonList>

        <IonList>
          <IonButton expand="block" onClick={loginClick}>Login</IonButton>
          <IonButton expand="block" onClick={() => setShowLoginModal(false)}>Cancel</IonButton>
        </IonList>
      </IonModal>

      <IonButton onClick={() => setShowRegisterModal(true)}>Register</IonButton>
      <IonButton onClick={() => setShowLoginModal(true)}>Login</IonButton>
      <IonButton onClick={logoutClick}>Log Out</IonButton>
      <IonButton onClick={checkUserClick}>Who Am I?</IonButton>
    </IonContent>
  );
};

export default RegisterModal;
