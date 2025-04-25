import { Redirect, Route } from "react-router-dom";

import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import React from "react";
import { cube, home, settings } from "ionicons/icons";
import Home from "../01-Home/Home";
import Shipment from "../02-Shipment/Shipment";
import Settings from "../03-Settings/Settings";

const MainRoutes: React.FC = () => {
  return (
    <div>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/shipment">
            <Shipment />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="shipment" href="/shipment">
            <IonIcon aria-hidden="true" icon={cube} />
            <IonLabel>Shipment</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon aria-hidden="true" icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </div>
  );
};

export default MainRoutes;
