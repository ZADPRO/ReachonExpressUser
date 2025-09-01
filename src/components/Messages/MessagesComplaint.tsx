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

const MessagesComplaint: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

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
          //   setRequests(data.data || []);
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

  return (
    <div>
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
