import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { notifications, person } from "ionicons/icons";
import React from "react";

import { HandCoins, Wallet } from "lucide-react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <img className="profileImage" src={person} alt="" />
            <div className="flex flex-column userNameIntro">
              <h3>User 1001</h3>
              <p>Madurai Dealer</p>
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

        <div className="contentContainer">
          <IonCard className="ion-card-custom">
            <IonCardHeader className="ion-card-header">
              <div className="fle">
                <IonCardTitle>300 </IonCardTitle>
                <IonCardSubtitle>Your Wallet Points</IonCardSubtitle>
              </div>
              <IonButtons>
                <button className="redeemButton">Redeem Now</button>
              </IonButtons>
            </IonCardHeader>

            <IonCardContent>
              <div className="walletPointsContainer">
                <div className="thisMonthEarned">
                  <Wallet />
                  <div className="earningsText">
                    <h3>70.00</h3>
                    <p>Earned This Month</p>
                  </div>
                </div>
                <div className="thisMonthEarned">
                  <HandCoins />
                  <div className="earningsText">
                    <h3>230.00</h3>
                    <p>Previous Month</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
