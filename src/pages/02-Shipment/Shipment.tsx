import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, search } from "ionicons/icons";
import React from "react";

const Shipment: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
        </IonToolbar>
      </IonHeader>
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
