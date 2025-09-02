import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useRef, useState } from "react";

import MessagesAll from "../../components/Messages/MessagesAll";
import MessagesComplaint from "../../components/Messages/MessagesComplaint";
import MessagesRequest from "../../components/Messages/MessagesRequest";

const Messages: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<any>("complaint");
  const page = useRef(undefined);

  // Helper function to render component based on segment
  const renderContent = () => {
    switch (selectedSegment) {
      case "all":
        return <MessagesAll />;
      case "request":
        return <MessagesRequest />;
      case "complaint":
        return <MessagesComplaint />;
      default:
        return <MessagesAll />;
    }
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <div className="profileSectionHeader flex align-items-center justify-content-between">
            <div className="profileSecStart flex align-content-center gap-2">
              <IonBackButton
                defaultHref="/shipment"
                icon={chevronBack}
                mode="md"
                style={{ color: "white" }}
              />
              <IonTitle>Messages</IonTitle>
            </div>
          </div>
        </IonToolbar>

        <IonToolbar>
          <IonSegment
            value={selectedSegment}
            color="light"
            onIonChange={(e) => setSelectedSegment(e.detail.value!)}
          >
            <IonSegmentButton value="all">
              <IonLabel
                className={`ionSegmentLabel ${
                  selectedSegment === "all" ? "active" : ""
                }`}
              >
                All
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="request">
              <IonLabel
                className={`ionSegmentLabel ${
                  selectedSegment === "request" ? "active" : ""
                }`}
              >
                Request
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="complaint">
              <IonLabel
                className={`ionSegmentLabel ${
                  selectedSegment === "complaint" ? "active" : ""
                }`}
              >
                Complaint
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>{renderContent()}</IonContent>
    </IonPage>
  );
};

export default Messages;
