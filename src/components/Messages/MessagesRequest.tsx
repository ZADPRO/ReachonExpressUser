import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { chevronUpCircle } from "ionicons/icons";
import { useHistory } from "react-router";

const MessagesRequest: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          className="customFab"
          onClick={() => history.push("/messageRequest")}
        >
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default MessagesRequest;
