import {
  IonBackButton,
  IonButtons,
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
  helpOutline,
  logOutOutline,
  notifications,
  shareOutline,
  starOutline,
} from "ionicons/icons";
import { HandCoins, Wallet } from "lucide-react";
import React from "react";

import profileImg from "../../assets/profile/profile.svg";

const Settings: React.FC = () => {
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
          <div className="profileSecEnd">
            <IonButtons slot="end">
              <IonIcon
                className="notificationButton"
                icon={notifications}
                style={{ fontSize: "23px" }}
              />
            </IonButtons>
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
                  <Wallet />
                  <div className="earningsText">
                    <h3>30.00</h3>
                    <p>Earned This Month</p>
                  </div>
                </div>
                <div className="thisMonthEarned">
                  <HandCoins />
                  <div className="earningsText">
                    <h3>270.00</h3>
                    <p>Total Earning</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
          <p className="heading">Overall Settings</p>

          <IonList lines="full">
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={starOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>Reviews</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={helpOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>Questions & Answers</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={shareOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>Share Application</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={logOutOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar style={{ textAlign: "center" }}>
          Made in ❤ with ZAdroit IT Solutions
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Settings;
