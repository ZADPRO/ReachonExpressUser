import {
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
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
  helpOutline,
  informationCircleOutline,
  lockClosedOutline,
  logOutOutline,
  shareOutline,
  starOutline,
} from "ionicons/icons";
import { HandCoins, Wallet } from "lucide-react";
import React from "react";
import { useHistory } from "react-router-dom";

import profileImg from "../../assets/profile/profile.svg";

const Settings: React.FC = () => {
  const history = useHistory();

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
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
                <IonCardTitle>User 1001 </IonCardTitle>
                <IonCardSubtitle>Address</IonCardSubtitle>
              </div>
              <img className="flightIcon" src={profileImg} alt="Flight" />
            </IonCardHeader>

            <IonCardContent>
              <div className="walletPointsContainer">
                <div className="thisMonthEarned">
                  <Wallet color="black" />
                  <div className="earningsText">
                    <h3 color="black">30</h3>
                    <p>Parcels This Month</p>
                  </div>
                </div>
                <div className="thisMonthEarned">
                  <HandCoins color="black" />
                  <div className="earningsText">
                    <h3>270</h3>
                    <p>Total Parcels</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <p className="heading">Overall Settings</p>

          <IonList inset={true} lines="full">
            <IonItem
              button
              onClick={() => handleNavigation("/settings/reviews")}
            >
              <IonIcon icon={starOutline} slot="start" />
              <IonLabel>Reviews</IonLabel>
            </IonItem>

            <IonItem button onClick={() => handleNavigation("/settings/qna")}>
              <IonIcon icon={helpOutline} slot="start" />
              <IonLabel>Questions & Answers</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/shareApp")}
            >
              <IonIcon icon={shareOutline} slot="start" />
              <IonLabel>Share Application</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/forgotPassword")}
            >
              <IonIcon icon={lockClosedOutline} slot="start" />
              <IonLabel>Forgot Password</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/forgotPassword")}
            >
              <IonIcon icon={documentTextOutline} slot="start" />
              <IonLabel>Terms & Privacy Policy</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/forgotPassword")}
            >
              <IonIcon icon={informationCircleOutline} slot="start" />
              <IonLabel>App Info</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/forgotPassword")}
            >
              <IonIcon icon={helpCircleOutline} slot="start" />
              <IonLabel>Help Center</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => handleNavigation("/settings/logout")}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar style={{ textAlign: "center" }}>
          Made in ❤️ with ZAdroit IT Solutions
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Settings;
