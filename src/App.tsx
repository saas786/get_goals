import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { FirebaseAppProvider } from "reactfire";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Auth from "pages/Auth";
import Task from "pages/Task";
import { UserContext } from "components/providers/UserContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { firebaseConfig } from "firebase/firebaseConfig";
import Leaderboard from "pages/Leaderboard";
import FriendsLeaderboard from "pages/FriendsLeaderboard";

const App: React.FC = () => (
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <UserContext>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/auth">
              <Auth />
            </Route>
            <Route exact path="/task">
              <Task />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route exact path="/friendsleaderboard">
              <FriendsLeaderboard />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </UserContext>
  </FirebaseAppProvider>
);

export default App;
