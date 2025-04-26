import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import "./main.css";

import React from "react";
import {
  cube,
  cubeOutline,
  home,
  homeOutline,
  settings,
  settingsOutline,
} from "ionicons/icons";

import Home from "../01-Home/Home";
import Shipment from "../02-Shipment/Shipment";
import Settings from "../03-Settings/Settings";

const MainRoutes: React.FC = () => {
  const location = useLocation();

  const showTabBar = ["/home", "/shipment", "/settings"].includes(
    location.pathname
  );

  const getIcon = (tab: string, filled: any, outline: any) =>
    location.pathname === tab ? filled : outline;

  const getActiveClass = (tab: string) =>
    location.pathname === tab ? "active-tab" : "";

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

        {showTabBar && (
          <IonTabBar slot="bottom">
            <IonTabButton
              tab="home"
              href="/home"
              className={getActiveClass("/home")}
              style={{
                backgroundColor:
                  location.pathname === "/home" ? "#1f3b54" : "transparent",
                color: location.pathname === "/home" ? "white" : "#1f3b54",
              }}
            >
              <IonIcon
                aria-hidden="true"
                icon={getIcon("/home", home, homeOutline)}
                style={{
                  color: location.pathname === "/home" ? "white" : "#1f3b54",
                }}
              />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="shipment"
              href="/shipment"
              className={getActiveClass("/shipment")}
              style={{
                backgroundColor:
                  location.pathname === "/shipment" ? "#1f3b54" : "transparent",
                color: location.pathname === "/shipment" ? "white" : "#1f3b54",
              }}
            >
              <IonIcon
                aria-hidden="true"
                icon={getIcon("/shipment", cube, cubeOutline)}
                style={{
                  color:
                    location.pathname === "/shipment" ? "white" : "#1f3b54",
                }}
              />
              <IonLabel>Shipment</IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="settings"
              href="/settings"
              className={getActiveClass("/settings")}
              style={{
                backgroundColor:
                  location.pathname === "/settings" ? "#1f3b54" : "transparent",
                color: location.pathname === "/settings" ? "white" : "#1f3b54",
              }}
            >
              <IonIcon
                aria-hidden="true"
                icon={getIcon("/settings", settings, settingsOutline)}
                style={{
                  color:
                    location.pathname === "/settings" ? "white" : "#1f3b54",
                }}
              />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        )}
      </IonTabs>
    </div>
  );
};

export default MainRoutes;
