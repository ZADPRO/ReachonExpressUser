import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";

const AddNewRequest: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="profileSectionHeader flex align-items-center justify-content-between">
            <div className="profileSecStart flex align-content-center gap-2">
              <IonBackButton
                defaultHref="/messages"
                icon={chevronBack}
                mode="md"
                style={{ color: "white" }}
              />
              <IonTitle>New Request</IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default AddNewRequest;
