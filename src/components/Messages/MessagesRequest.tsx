import React, { useEffect, useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { addCircle, chevronUpCircle } from "ionicons/icons";
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

const MessagesRequest: React.FC = () => {
  const history = useHistory();
  const [requests, setRequests] = useState<Request[]>([]);

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
          // Assuming your response contains an array of requests in data.requests
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

  return (
    <div>
      {requests.length > 0 ? (
        requests.map((req, index) => (
          <div
            key={index}
            className="requestCards align-items-center m-2 p-3 border-round-lg shadow-3 justify-content-between flex gap-3"
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
