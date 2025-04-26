import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { chevronBack, search } from "ionicons/icons";
import React from "react";

const Shipment: React.FC = () => {
  return (
    <IonPage>
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
              {/* <IonIcon
                className="notificationButton"
                icon={notifications}
                style={{ fontSize: "23px" }}
              /> */}
            </IonButtons>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Shipment;
