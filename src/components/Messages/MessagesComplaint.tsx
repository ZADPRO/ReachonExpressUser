import React, { useEffect, useState } from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSkeletonText,
} from "@ionic/react";
import { addCircle, closeCircle } from "ionicons/icons";
import { useHistory } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import { Divider } from "primereact/divider";

export interface Request {
  id: number; // complaint ID
  refReqId: number; // request reference ID
  reqId: number; // original request ID (from raiseRequest)

  complaintStatus: string;
  complaintType: string; // e.g., "count-mismatch"
  Description: string; // complaint description
  latestStatus: string; // e.g., "Request Raised"

  senderId: string;
  senderName: string;
  senderMobile: string;

  receiverName: string;
  receiverMobile: string;
  receiverPincode: string;

  parcelDetails: string; // e.g., "non-document"
  boxCount: string;
  weight: string;
  specifications: string;

  isDelete: boolean;
  isAccepted: boolean;

  createdAt: string; // ISO timestamp
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

const ParcelDetail: React.FC<{ label: string; value: any }> = ({
  label,
  value,
}) => (
  <div className="flex justify-content-between capitalize border-bottom-1 surface-border py-2">
    <strong>{label}</strong>
    <span>{value || "-"}</span>
  </div>
);

const MessagesComplaint: React.FC = () => {
  const history = useHistory();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Request | null>(null);

  const getCategory = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/UserRoutes/getAllComplaints", {
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
          console.log("data", data);
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

  const openParcelDetails = (parcel: Request) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Skeleton Loader */}
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="requestCards align-items-center m-2 p-3 border-round-lg shadow-3 flex gap-3"
          >
            <IonSkeletonText
              animated
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <Divider layout="vertical" className="m-0" />
            <div className="flex flex-column gap-2" style={{ flex: 1 }}>
              <IonSkeletonText animated style={{ width: "60%" }} />
              <IonSkeletonText animated style={{ width: "40%" }} />
            </div>
            <IonSkeletonText animated style={{ width: "20%" }} />
          </div>
        ))
      ) : requests.length > 0 ? (
        requests.map((req, index) => (
          <div
            key={index}
            className="requestCards align-items-center m-2 p-3 border-round-lg shadow-3 justify-content-between flex gap-3 cursor-pointer"
            onClick={() => openParcelDetails(req)}
          >
            <div className="flex gap-3 align-items-center">
              <p className="customIconBg capitalize">
                {req.senderName ? req.senderName.charAt(0).toUpperCase() : "?"}
              </p>
              <Divider layout="vertical" className="m-0" />
              <div className="flex flex-column">
                <p className="receiverName font-bold capitalize">
                  Type: {req.complaintType}
                </p>
                <p>Raised By: {req.senderName}</p>
              </div>
            </div>
            <p className="capitalize">
              {req.complaintStatus ? req.complaintStatus : "Pending"}
            </p>
          </div>
        ))
      ) : (
        <p className="m-3">No requests found</p>
      )}
      {/* Modal */}
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-content-between align-items-center px-3">
              <h4 className="text-white m-0 uppercase">Parcel Details</h4>
              <IonIcon
                icon={closeCircle}
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {selectedParcel ? (
            <div className="p-3 surface-card border-round-lg">
              <div className="flex flex-column gap-2">
                <ParcelDetail label="Request ID" value={selectedParcel.reqId} />
                <ParcelDetail
                  label="Sender"
                  value={selectedParcel.senderName}
                />
                <ParcelDetail
                  label="Receiver"
                  value={`${selectedParcel.receiverName} (${selectedParcel.receiverMobile})`}
                />
                <ParcelDetail
                  label="Destination Pincode"
                  value={selectedParcel.receiverPincode}
                />
                <ParcelDetail
                  label="Parcel Details"
                  value={selectedParcel.parcelDetails}
                />
                <ParcelDetail
                  label="Box Count"
                  value={selectedParcel.boxCount}
                />
                <ParcelDetail label="Weight" value={selectedParcel.weight} />
                <ParcelDetail
                  label="Specifications"
                  value={selectedParcel.specifications}
                />
                <ParcelDetail
                  label="Status"
                  value={selectedParcel.latestStatus}
                />
                <ParcelDetail
                  label="Created At"
                  value={new Date(selectedParcel.createdAt).toLocaleString()}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-500">No parcel selected.</p>
          )}
        </IonContent>
      </IonModal>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          className="customFab"
          onClick={() => history.push("/messageComplaint")}
        >
          <IonIcon icon={addCircle}></IonIcon>
        </IonFabButton>
      </IonFab>{" "}
    </div>
  );
};

export default MessagesComplaint;
