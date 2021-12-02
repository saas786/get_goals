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
import { registerUser, loginUser, checkLoginUser, logoutUser } from "firebase/userFunction";
import { checkLength } from "components/CheckLength";
import { userInfo } from "os";

export const RegisterModal: React.FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async () => {
    if (password === "" || email === "" || name === "") {
      //SET ERROR TOAST
      console.log("DO NOT LEAVE ALL BLANK");
      return false;
    } else {
      const passLength = checkLength(password);

      if (passLength === true) {
        const registered = registerUser(name, email, password);
        console.log(registered);

        if (register !== null) {
          //SET SUCESSFULL TOAST
          console.log("REGISTER SUCESSFULL");
          return true;
        }
      } else {
        //SET ERROR TOAST
        console.log("PASSWORD NEED TO BE MORE THAN 6 CHARACTERS");
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
      console.log(login);

      if (login !== null) {
        //set sucessfull toast
        return true;
      }
    }
  };

  const check = async () => {
    const user = await checkLoginUser();
    console.log(user);
    return user;
  }

  const logout = async () => {
    const user = await logoutUser();
  }

  async function registerClick() {
    const registerResult = await register();
    console.log(registerResult);
    if (registerResult == true) {
      setShowRegisterModal(false);
    }
  }

  async function loginClick() {
    const loginResult = await login();
    console.log(loginResult);
    if (loginResult == true) {
      setShowLoginModal(false);
    }
  }

  async function checkUserClick() {
    const user = await check();
    console.log (user);
    return true;
  }

  async function logoutClick() {
    const user = await logout();
    console.log (user);
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
        <IonButton expand="block" size="large" onClick={registerClick}>
          Register
        </IonButton>
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

        <IonButton onClick={loginClick}>Login</IonButton>
      </IonModal>

      <IonButton onClick={() => setShowRegisterModal(true)}>Register</IonButton>
      <IonButton onClick={() => setShowLoginModal(true)}>Login</IonButton>
      <IonButton onClick={logoutClick}>Log Out</IonButton>
      <IonButton onClick={checkUserClick}>Who Am I?</IonButton>
    </IonContent>
  );
};

export default RegisterModal;
