import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Divider } from "primereact/divider";
import axios from "axios";
import decrypt from "../../../helper";
import { useHistory } from "react-router";

const AddNewComplaint: React.FC = () => {
  const [parcelDetails, setParcelDetails] = useState("");

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
              <IonTitle>Raise New Complaint</IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="my-3 mx-3">
          <p className="font-bold uppercase underline">Basic Details</p>
          <IonSelect
            value={parcelDetails}
            onIonChange={(e) => setParcelDetails(e.detail.value)}
            fill="outline"
            labelPlacement="floating"
            label="Booking ID"
            mode="md"
            className="custom-input mt-2"
            placeholder="Booking ID"
          >
            <IonSelectOption value="document">Document</IonSelectOption>
            <IonSelectOption value="non-document">Non Document</IonSelectOption>
          </IonSelect>
          <IonSelect
            value={parcelDetails}
            onIonChange={(e) => setParcelDetails(e.detail.value)}
            fill="outline"
            label="Complaint Type"
            labelPlacement="floating"
            mode="md"
            className="custom-input mt-2"
            placeholder="Complaint Type"
          >
            <IonSelectOption value="document">Count Mismatch</IonSelectOption>
            <IonSelectOption value="non-document">
              Product Missing
            </IonSelectOption>
            <IonSelectOption value="document">Others</IonSelectOption>
          </IonSelect>
          <IonTextarea
            // value={senderName}
            readonly
            className="mt-2 custom-input"
            mode="md"
            label="Description"
            rows={5}
            labelPlacement="floating"
            fill="outline"
          />

          <Divider />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddNewComplaint;
