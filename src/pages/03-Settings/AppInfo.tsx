import { IonBackButton, IonContent, IonPage } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useEffect } from "react";

import logo from "../../assets/fav/FAV 2_REACHON-02.svg";
import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style

const AppInfo: React.FC = () => {
  useEffect(() => {
    // Adjust the status bar appearance
    StatusBar.setOverlaysWebView({ overlay: false }); // Ensure content does not overlap the status bar
    StatusBar.setStyle({ style: Style.Dark }); // Correct way to set the style (Dark or Light)

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true }); // Reset when component unmounts (optional)
    };
  }, []);
  return (
    <IonPage>
      <IonContent className="">
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <IonBackButton
              defaultHref="/settings"
              icon={chevronBack}
              mode="md"
              style={{ color: "white" }}
            />
            <div className="flex flex-column userNameIntro">
              <h3>App Info</h3>
            </div>
          </div>
        </div>

        {/* Centered Content */}
        <div className="centerContent">
          <p>Reachon Express</p>
          <p>Version: 1.0.0</p>
          <img src={logo} className="w-14rem" alt="" />
          <p>2025 Reachon Express Inc</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AppInfo;
