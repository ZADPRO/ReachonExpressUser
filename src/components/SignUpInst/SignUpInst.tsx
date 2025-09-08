import {
  IonBackButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";

const SignUpInst: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="profileSectionHeader flex align-items-center justify-content-between">
            <div className="profileSecStart flex align-content-center gap-2">
              <IonBackButton
                defaultHref="/login"
                icon={chevronBack}
                mode="md"
                style={{ color: "white" }}
              />
              <IonTitle>Sign Up Instructions</IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>
          Kindly contact the <strong>Reachon Express Admin</strong> for sign-up
          assistance.
        </p>
        <p>
          Website:{" "}
          <a
            href="https://reachonexpress.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://reachonexpress.com/
          </a>
        </p>
        <p>
          Name: <strong>Reachon Admin</strong>
        </p>
        <p>
          Contact Email:{" "}
          <a href="mailto:info@reachonexpress.com">info@reachonexpress.com</a>
        </p>
      </IonContent>

      <IonFooter />
    </IonPage>
  );
};

export default SignUpInst;
