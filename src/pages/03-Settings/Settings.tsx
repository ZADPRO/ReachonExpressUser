import {
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import {
  chevronBack,
  documentTextOutline,
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  shareOutline,
  starOutline,
} from "ionicons/icons";
import { HandCoins, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import profileImg from "../../assets/profile/profile.svg";

import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style
import axios from "axios";
import decrypt from "../../helper";

const Settings: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    // Adjust the status bar appearance
    StatusBar.setOverlaysWebView({ overlay: false }); // Ensure content does not overlap the status bar
    StatusBar.setStyle({ style: Style.Dark }); // Correct way to set the style (Dark or Light)

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true }); // Reset when component unmounts (optional)
    };
  }, []);

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    console.log("userDetailsString", userDetailsString);
    if (userDetailsString) {
      setUserDetails(JSON.parse(userDetailsString));
    }
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

      <IonContent color={"light"}>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <IonBackButton
              defaultHref="/home"
              icon={chevronBack}
              mode="md"
              style={{ color: "white" }}
            />
            <div className="flex flex-column userNameIntro">
              <h3>Settings</h3>
            </div>
          </div>
        </div>

        <div className="settingsPageContents">
          <IonCard className="ion-card-custom">
            <IonCardHeader className="ion-card-header">
              <div className="fle">
                <IonCardTitle>
                  {" "}
                  {userDetails
                    ? `${userDetails.refCustomerName}`
                    : "Loading..."}
                </IonCardTitle>
                <IonCardSubtitle>Customer</IonCardSubtitle>
              </div>
              <img className="flightIcon" src={profileImg} alt="Flight" />
            </IonCardHeader>

            <IonCardContent>
              <div className="walletPointsContainer">
                <div className="thisMonthEarned">
                  <Wallet color="black" />
                  <div className="earningsText">
                    <h3 color="black">{userParcelDetails?.length}</h3>
                    <p>Parcels This Month</p>
                  </div>
                </div>
                <div className="thisMonthEarned">
                  <HandCoins color="black" />
                  <div className="earningsText">
                    <h3 color="black">{userParcelDetails?.length}</h3>
                    <p>Total Parcels</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* General Settings */}
          <p className="heading">General</p>
          <IonList inset={true} lines="full">
            <IonItem
              button
              onClick={() => handleNavigation("/settings/reviews")}
            >
              <IonIcon icon={starOutline} slot="start" />
              <IonLabel>Reviews</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/shareApp")}
            >
              <IonIcon icon={shareOutline} slot="start" />
              <IonLabel>Share Application</IonLabel>
            </IonItem>
          </IonList>

          {/* Security Settings */}
          {/* <p className="heading">Security</p>
          <IonList inset={true} lines="full">
            <IonItem
              button
              onClick={() => handleNavigation("/settings/forgotPassword")}
            >
              <IonIcon icon={lockClosedOutline} slot="start" />
              <IonLabel>Forgot Password</IonLabel>
            </IonItem>
          </IonList> */}

          {/* App Info Settings */}
          <p className="heading">Application Info</p>
          <IonList inset={true} lines="full">
            <IonItem button onClick={() => handleNavigation("/settings/terms")}>
              <IonIcon icon={documentTextOutline} slot="start" />
              <IonLabel>Terms & Privacy Policy</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/appInfo")}
            >
              <IonIcon icon={informationCircleOutline} slot="start" />
              <IonLabel>App Info</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/helpCenter")}
            >
              <IonIcon icon={helpCircleOutline} slot="start" />
              <IonLabel>Help Center</IonLabel>
            </IonItem>
          </IonList>

          {/* Account */}
          <p className="heading">Account</p>
          <IonList inset={true} lines="full">
            <IonItem
              button
              onClick={() => {
                localStorage.removeItem("userDetails");
                localStorage.removeItem("JWTtoken");
                localStorage.removeItem("loginStatus");

                history.replace("/login");
              }}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </div>
        <IonToolbar style={{ textAlign: "center" }}>
          Made in ❤️ with ZAdroit IT Solutions
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
