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

const AddNewRequest: React.FC = () => {
  const history = useHistory();
  // 🔹 Sender details (from localStorage)
  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderMobile, setSenderMobile] = useState("");

  // 🔹 Receiver/Parcel states
  const [receiverName, setReceiverName] = useState("");
  const [receiverMobile, setReceiverMobile] = useState("");
  const [receiverPincode, setReceiverPincode] = useState("");
  const [parcelDetails, setParcelDetails] = useState("");
  const [boxCount, setBoxCount] = useState("");
  const [weight, setWeight] = useState("");
  const [specifications, setSpecifications] = useState("");

  // 🔹 Load user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setSenderId(parsed.refCustomerId || "");
        setSenderName(parsed.refCustomerName || "");
        setSenderMobile(parsed.refPhone || "");
      } catch (err) {
        console.error("Error parsing userDetails from localStorage:", err);
      }
    }
  }, []);

  // 🔹 Validation check
  const isFormValid =
    receiverName.trim() !== "" &&
    receiverMobile.trim() !== "" &&
    receiverPincode.trim() !== "" &&
    parcelDetails.trim() !== "" &&
    boxCount.trim() !== "" &&
    weight.trim() !== "";

  // 🔹 Create payload
  const handleRaiseRequest = async () => {
    const payload = {
      senderName: senderName,
      senderId: senderId,
      senderMobile: senderMobile,
      receiverName: receiverName,
      receiverMobile: receiverMobile,
      receiverPincode: receiverPincode,
      parcelDetails: parcelDetails,
      boxCount: boxCount,
      weight: weight,
      specifications: specifications,
      createdAt: new Date().toISOString(),
      createdBy: senderId,
      isDelete: "false",
      isAccepted: "false",
      latestStatus: "Request Raised",
    };

    console.log("Payload to store in DB:", payload);
    // 👉 Later API call goes here

    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/userRoutes/raiseRequest",
      payload,
      {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      }
    );

    const data = decrypt(
      response.data[1],
      response.data[0],
      import.meta.env.VITE_ENCRYPTION_KEY
    );

    if (data.success) {
      console.log("data", data);
      history.goBack();
    }
  };

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
            value={senderName}
            readonly
            className="mt-2 custom-input"
            mode="md"
            label="Name"
            labelPlacement="floating"
            fill="outline"
          />
          <IonInput
            value={senderMobile}
            readonly
            className="mt-2 custom-input"
            mode="md"
            label="Phone Number"
            labelPlacement="floating"
            fill="outline"
          />

          <Divider />

          <p className="font-bold uppercase underline">Receiver Details</p>
          <IonInput
            value={receiverName}
            onIonChange={(e) => setReceiverName(e.detail.value!)}
            className="mt-2 custom-input"
            mode="md"
            label="Name"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Name"
          />
          <IonInput
            value={receiverMobile}
            onIonChange={(e) => setReceiverMobile(e.detail.value!)}
            className="mt-2 custom-input"
            mode="md"
            label="Phone Number"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Phone Number"
          />
          <IonInput
            value={receiverPincode}
            onIonChange={(e) => setReceiverPincode(e.detail.value!)}
            className="mt-2 custom-input"
            mode="md"
            label="Pincode"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Pincode"
          />

          <Divider />

          <p className="font-bold uppercase underline">Parcel Details</p>
          <IonSelect
            value={parcelDetails}
            onIonChange={(e) => setParcelDetails(e.detail.value)}
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
            value={boxCount}
            onIonChange={(e) => setBoxCount(e.detail.value!)}
            className="mt-2 custom-input"
            mode="md"
            label="No Of Boxes"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter No Of Boxes"
          />
          <IonInput
            value={weight}
            onIonChange={(e) => setWeight(e.detail.value!)}
            className="mt-2 custom-input"
            mode="md"
            label="Approximate Weight"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Approx Weight"
          />
          <IonTextarea
            value={specifications}
            onIonChange={(e) => setSpecifications(e.detail.value!)}
            className="mt-2 custom-input"
            mode="md"
            autoGrow={true}
            label="Specifications (If Avail)"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter Specifications"
          />
        </div>

        <IonButton
          expand="block"
          className="uppercase mx-3 customBtn"
          onClick={handleRaiseRequest}
          disabled={!isFormValid}
        >
          Raise Request
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddNewRequest;
