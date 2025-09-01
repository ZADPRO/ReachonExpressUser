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

import React, { useEffect } from "react";
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
import Splash from "../04-Authentication/Splash";
import Reviews from "../03-Settings/Reviews";
import QnA from "../03-Settings/QnA";
import ShareApp from "../03-Settings/ShareApp";
import Login from "../04-Authentication/Login";
import ForgotPassword from "../04-Authentication/ForgotPassword";
import AppInfo from "../03-Settings/AppInfo";
import TermsPolicy from "../03-Settings/TermsPolicy";
import HelpCenter from "../03-Settings/HelpCenter";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import Messages from "../05-Messages/Messages";
import AddNewRequest from "../../components/Messages/AddNewRequest/AddNewRequest";
import AddNewComplaint from "../../components/Messages/AddNewComplaint/AddNewComplaint";

const MainRoutes: React.FC = () => {
  // STATUS BAR CONFIG
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false });

      StatusBar.setBackgroundColor({ color: "#0377de" });

      return () => {
        StatusBar.setOverlaysWebView({ overlay: true });
      };
    }
  }, []);

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
          <Route path="/splash">
            <Splash />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/shipment">
            <Shipment />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/settings/reviews">
            <Reviews />
          </Route>
          <Route path="/settings/qna">
            <QnA />
          </Route>
          <Route path="/settings/shareApp">
            <ShareApp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/messageRequest">
            <AddNewRequest />
          </Route>
          <Route path="/messageComplaint">
            <AddNewComplaint />
          </Route>
          <Route path="/settings/forgotPassword">
            <ForgotPassword />
          </Route>

          <Route path="/settings/appInfo">
            <AppInfo />
          </Route>
          <Route path="/settings/terms">
            <TermsPolicy />
          </Route>
          <Route path="/settings/helpCenter">
            <HelpCenter />
          </Route>
          <Route exact path="/">
            <Redirect to="/splash" />
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
                  location.pathname === "/home" ? "#202d71" : "transparent",
                color: location.pathname === "/home" ? "white" : "#202d71",
              }}
            >
              <IonIcon
                aria-hidden="true"
                icon={getIcon("/home", home, homeOutline)}
                style={{
                  color: location.pathname === "/home" ? "white" : "#202d71",
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
                  location.pathname === "/shipment" ? "#202d71" : "transparent",
                color: location.pathname === "/shipment" ? "white" : "#202d71",
              }}
            >
              <IonIcon
                aria-hidden="true"
                icon={getIcon("/shipment", cube, cubeOutline)}
                style={{
                  color:
                    location.pathname === "/shipment" ? "white" : "#202d71",
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
                  location.pathname === "/settings" ? "#202d71" : "transparent",
                color: location.pathname === "/settings" ? "white" : "#202d71",
              }}
            >
              <IonIcon
                aria-hidden="true"
                icon={getIcon("/settings", settings, settingsOutline)}
                style={{
                  color:
                    location.pathname === "/settings" ? "white" : "#202d71",
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
