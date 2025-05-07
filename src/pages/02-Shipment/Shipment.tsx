import React, { useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { chevronBack, search } from "ionicons/icons";
import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style

const Shipment: React.FC = () => {
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
      <IonHeader></IonHeader>
      <IonContent>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <IonBackButton
              defaultHref="/home"
              icon={chevronBack}
              mode="md"
              style={{ color: "white" }}
            />
            <div className="flex flex-column userNameIntro">
              <h3>Transactions</h3>
            </div>
          </div>
          <div className="profileSecEnd">
            <IonButtons slot="end" className="gap-2">
              <IonIcon
                className="notificationButton"
                icon={search}
                style={{ fontSize: "23px" }}
              />
            </IonButtons>
          </div>
        </div>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Shipment;
