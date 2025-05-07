import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/fav/FAV_REACHON-02.svg";

import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Adjust the status bar appearance
    StatusBar.setOverlaysWebView({ overlay: false }); // Ensure content does not overlap the status bar
    StatusBar.setStyle({ style: Style.Dark }); // Correct way to set the style (Dark or Light)

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true }); // Reset when component unmounts (optional)
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/login"); // Navigate to login page
    }, 2500);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [history]);

  return (
    <IonPage>
      <IonContent>
        <div className="splashScreen h-full flex justify-center items-center">
          <img src={logo} alt="Splash Logo" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
