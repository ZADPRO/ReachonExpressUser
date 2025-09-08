import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonToast,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Divider } from "primereact/divider";
import axios from "axios";
import decrypt from "../../../helper";
import { useHistory } from "react-router";

interface Request {
  boxCount: string;
  createdAt: string;
  createdBy: string;
  isAccepted: boolean;
  isDelete: boolean;
  latestStatus: string;
  parcelDetails: string;
  receiverMobile: string;
  receiverName: string;
  receiverPincode: string;
  reqId: number;
  senderId: string;
  senderMobile: string;
  senderName: string;
  specifications: string;
  weight: string;
}

const AddNewComplaint: React.FC = () => {
  const history = useHistory();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [complaintType, setComplaintType] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Validation feedback
  const [error, setError] = useState<string>("");

  const getCategory = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/UserRoutes/getAllRequests", {
        headers: { Authorization: localStorage.getItem("JWTtoken") || "" },
      })
      .then((res: any) => {
        if (res.error) {
          localStorage.removeItem("userDetails");
          history.replace("/login");
          return;
        }

        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.token) {
          localStorage.setItem("JWTtoken", "Bearer " + data.token);
          setRequests(data.data || []);
        } else {
          localStorage.removeItem("userDetails");
          history.replace("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Format date to readable form
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = async () => {
    if (!bookingId || !complaintType || !description.trim()) {
      setError("All fields are required");
      return;
    }

    const payload = {
      BookingId: bookingId,
      complaintType,
      description,
    };

    console.log("Payload to send:", payload);

    setError("");

    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/userRoutes/raiseComplaint",
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
              <IonTitle>Raise New Complaint</IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="my-3 mx-3">
          <p className="font-bold uppercase underline">Basic Details</p>

          {/* Booking ID Select */}
          <IonSelect
            value={bookingId ?? ""}
            onIonChange={(e) => setBookingId(Number(e.detail.value))}
            fill="outline"
            labelPlacement="floating"
            label="Booking ID"
            mode="md"
            className="custom-input mt-3"
            placeholder="Select Booking ID"
            interface="popover"
            interfaceOptions={{
              cssClass: "custom-popover",
            }}
          >
            {requests.map((req) => (
              <IonSelectOption key={req.reqId} value={req.reqId}>
                {req.reqId} ({formatDate(req.createdAt)})
              </IonSelectOption>
            ))}
          </IonSelect>

          {/* Complaint Type Select */}
          <IonSelect
            value={complaintType}
            onIonChange={(e) => setComplaintType(e.detail.value)}
            fill="outline"
            label="Complaint Type"
            labelPlacement="floating"
            mode="md"
            className="custom-input mt-3"
            placeholder="Complaint Type"
            interface="popover"
            interfaceOptions={{
              cssClass: "custom-popover",
            }}
          >
            <IonSelectOption value="count-mismatch">
              Count Mismatch
            </IonSelectOption>
            <IonSelectOption value="product-missing">
              Product Missing
            </IonSelectOption>
            <IonSelectOption value="others">Others</IonSelectOption>
          </IonSelect>

          {/* Description */}
          <IonTextarea
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
            className="mt-3 custom-input"
            mode="md"
            label="Description"
            rows={5}
            labelPlacement="floating"
            fill="outline"
          />

          <Divider />

          {/* Submit */}
          <IonButton
            expand="block"
            onClick={handleSubmit}
            className="mt-3 customBtn"
          >
            Submit Complaint
          </IonButton>
        </div>

        {/* Error Toast */}
        <IonToast
          isOpen={!!error}
          message={error}
          duration={2000}
          color="danger"
          onDidDismiss={() => setError("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddNewComplaint;
