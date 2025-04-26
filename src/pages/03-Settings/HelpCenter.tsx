import { IonBackButton, IonContent, IonPage } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";

const HelpCenter: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <IonBackButton
              defaultHref="/settings"
              icon={chevronBack}
              mode="md"
              style={{ color: "white" }}
            />
            <div className="flex flex-column userNameIntro">
              <h3>Help Center</h3>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelpCenter;
