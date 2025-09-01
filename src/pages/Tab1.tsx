import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import axios from "axios";
import { useState } from "react";

const Tab1: React.FC = () => {
  const [trackingData, setTrackingData] = useState<any>(null);

  const fetchTrackingStatus = async () => {
    try {
      const response = await axios.post(
        "https://blktracksvc.dtdc.com/dtdc-api/rest/JSONCnTrk/getTrackDetails",
        {
          trkType: "cnno",
          strcnno: "7X105432546",
          addtnlDtl: "Y",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              "EO1727_trk_json:47906b6b936de5d0500c3b9606edfeb4",
          },
        }
      );

      if (response.data?.statusCode === 200 && response.data?.statusFlag) {
        console.log("Tracking Response:", response.data);
        setTrackingData(response.data);
      } else {
        alert("Tracking failed or number not found.");
      }
    } catch (error) {
      console.error("Tracking Error:", error);
      alert("Error while tracking. Please try again.");
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <button className="p-button p-component" onClick={fetchTrackingStatus}>
          Track
        </button>
        {trackingData && (
          <div className="mt-4">
            <h4>Status: {trackingData.trackHeader?.strStatus}</h4>
            <p>Shipment No: {trackingData.trackHeader?.strShipmentNo}</p>
            <p>Booked Date: {trackingData.trackHeader?.strBookedDate}</p>
            <p>Origin: {trackingData.trackHeader?.strOrigin}</p>
            <p>Destination: {trackingData.trackHeader?.strDestination}</p>
            <h5>History:</h5>
            <ul>
              {trackingData.trackDetails?.map((event: any, index: number) => (
                <li key={index}>
                  [{event.strActionDate} {event.strActionTime}] -{" "}
                  <strong>{event.strAction}</strong> - {event.strOrigin} →{" "}
                  {event.strDestination}
                </li>
              ))}
            </ul>
          </div>
        )}
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
