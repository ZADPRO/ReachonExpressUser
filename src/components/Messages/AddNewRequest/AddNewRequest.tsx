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
              <IonTitle>Raise New Request</IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="my-3 mx-3">
          <p className="font-bold uppercase underline">Sender Details</p>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="Name"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Name"
          ></IonInput>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="Phone Number"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Phone Number"
          ></IonInput>

          <Divider />

          <p className="font-bold uppercase underline">Receiver Details</p>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="Name"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Name"
          ></IonInput>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="Phone Number"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Phone Number"
          ></IonInput>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="Pincode"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Pincode"
          ></IonInput>

          <Divider />

          <p className="font-bold uppercase underline">Parcel Details</p>
          <IonSelect
            fill="outline"
            labelPlacement="floating"
            mode="md"
            className="custom-input mt-2"
            placeholder="Parcel Type"
          >
            <IonSelectOption value="document">Document</IonSelectOption>
            <IonSelectOption value="non-document">Non Document</IonSelectOption>
          </IonSelect>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="No Of Boxes"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter No Of Boxes"
          ></IonInput>
          <IonInput
            className="mt-2 custom-input"
            mode="md"
            label="Approximate Weight"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Approx Weight"
          ></IonInput>
          <IonTextarea
            className="mt-2 custom-input"
            mode="md"
            autoGrow={true}
            label="Specifications (If Avail)"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Specifications"
          ></IonTextarea>
        </div>
        <IonButton expand="block" className="uppercase mx-3 customFab">
          Raise Request
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddNewRequest;
