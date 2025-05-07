import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/fav/FAV_REACHON-02.svg";

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/login"); // Navigate to login page
    }, 2500);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [history]);

  return (
    <IonPage>
      <IonContent>
        <div className="splashScreen h-full flex justify-center items-center">
          <img src={logo} alt="Splash Logo" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
