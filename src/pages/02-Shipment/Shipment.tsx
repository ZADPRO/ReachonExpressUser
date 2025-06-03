import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style
import axios from "axios";
import decrypt from "../../helper";
import { useHistory } from "react-router";

import moment from "moment";
import { Divider } from "primereact/divider";

const Shipment: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Adjust the status bar appearance
    StatusBar.setOverlaysWebView({ overlay: false }); // Ensure content does not overlap the status bar
    StatusBar.setStyle({ style: Style.Dark }); // Correct way to set the style (Dark or Light)

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true }); // Reset when component unmounts (optional)
    };
  }, []);

  const [userParcelDetails, setUserParcelDetails] = useState<any[]>([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/UserRoutes/userDetails", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.token) {
          console.log("data line 62", data);
          localStorage.setItem("JWTtoken", "Bearer " + data.token);
          setUserParcelDetails(data.userParcelData);
        } else {
          history.push("/home");
        }
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <IonBackButton
              defaultHref="/home"
              icon={chevronBack}
              mode="md"
              style={{ color: "white" }}
            />
            <div className="flex flex-column userNameIntro">
              <h3>Transactions</h3>
            </div>
          </div>
          <div className="profileSecEnd"></div>
        </div>
        <div className="parcelDetails px-2">
          {userParcelDetails && userParcelDetails.length > 0 ? (
            userParcelDetails.map((parcel, index) => (
              <div key={index} className="my-3">
                <p className="font-bold text-lg">#{index + 1}</p>{" "}
                <div
                  className="card border-1 p-2"
                  style={{ borderRadius: "10px" }}
                >
                  <div className="flex justify-content-between py-2">
                    <p className="m-0">
                      <strong>Vendor:</strong> {parcel.vendor}
                    </p>
                    <p className="m-0">
                      <strong>
                        {" "}
                        {parcel.result?.success ? "Booked" : "Failed"}
                      </strong>
                    </p>
                  </div>
                  <div className="flex justify-content-between py-2">
                    <p className="m-0">
                      <strong>Count:</strong> {parcel.noofpieces}
                    </p>
                    <p className="m-0">
                      <strong>{parcel.result?.success ? "Taken" : "-"}</strong>
                    </p>
                  </div>
                  <p className="m-0 py-1">
                    <strong>Time :</strong>{" "}
                    {moment(parcel.createdat).format("DD-MM-YY, hh:mm A")}
                  </p>
                  <p className="m-0 py-1">
                    <strong>From:</strong> {parcel.consignoraddress}
                  </p>
                  <p className="m-0 py-1">
                    <strong>To:</strong> {parcel.consigneeaddress}
                  </p>
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <p className="w-full text-center">
              ... No Parcel Data Available ...
            </p>
          )}
        </div>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Shipment;
