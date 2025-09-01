import React, { useEffect, useState } from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
} from "@ionic/react";
import { addCircle, closeCircle } from "ionicons/icons";
import { useHistory } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import { Divider } from "primereact/divider";

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

const ParcelDetail: React.FC<{ label: string; value: any }> = ({
  label,
  value,
}) => (
  <div className="flex justify-content-between capitalize border-bottom-1 surface-border py-2">
    <strong>{label}</strong>
    <span>{value || "-"}</span>
  </div>
);

const MessagesRequest: React.FC = () => {
  const history = useHistory();
  const [requests, setRequests] = useState<Request[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Request | null>(null);

  const getCategory = () => {
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

        console.log("data", data);

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
      {requests.length > 0 ? (
        requests.map((req, index) => (
          <div
            key={index}
            className="requestCards align-items-center m-2 p-3 border-round-lg shadow-3 justify-content-between flex gap-3 cursor-pointer"
            onClick={() => openParcelDetails(req)}
          >
            <div className="flex gap-3 align-items-center">
              <p className="customIconBg">
                {req.receiverName
                  ? req.receiverName.charAt(0).toUpperCase()
                  : "?"}
              </p>
              <Divider layout="vertical" className="m-0" />
              <div className="flex flex-column">
                <p className="receiverName font-bold">
                  Name: {req.receiverName}
                </p>
                <p>Dest: {req.receiverPincode}</p>
              </div>
            </div>
            <p>{req.latestStatus}</p>
          </div>
        ))
      ) : (
        <p className="m-3">No requests found</p>
      )}

      {/* Modal */}
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-content-between align-items-center">
              <h4 className="text-white m-0 uppercase">Parcel Details</h4>
              <IonIcon
                icon={closeCircle}
                style={{ fontSize: "25px" }}
                onClick={() => setIsModalOpen(false)}
              />
              {/* <IonButton
                fill="clear"
                onClick={() => setIsModalOpen(false)}
                className="text-white"
              >
              </IonButton> */}
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
                  value={`${selectedParcel.senderName}`}
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
          onClick={() => history.push("/messageRequest")}
        >
          <IonIcon icon={addCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default MessagesRequest;
