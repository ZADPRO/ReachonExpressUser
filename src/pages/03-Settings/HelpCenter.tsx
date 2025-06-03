import { IonBackButton, IonContent, IonPage } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style
import { Divider } from "primereact/divider";

const HelpCenter: React.FC = () => {
  useEffect(() => {
    // Adjust the status bar appearance
    StatusBar.setOverlaysWebView({ overlay: false }); // Ensure content does not overlap the status bar
    StatusBar.setStyle({ style: Style.Dark }); // Correct way to set the style (Dark or Light)

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true }); // Reset when component unmounts (optional)
    };
  }, []);
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
        <div className="terms px-3">
          <p className="uppercase underline">
            <b>Getting Started</b>
          </p>
          <p>
            <b>1. What is Reachon Express?</b>
          </p>
          <p className="text-justify">
            Reachon Express is a parcel tracking app that helps you track your
            shipments and parcels easily. You can use this app to:
          </p>
          <ul>
            <li>Log in to your account.</li>
            <li>Track the status of your orders with your tracking number.</li>
            <li>
              View delivery updates from leading courier companies like DTDC and
              Delhivery.
            </li>
          </ul>
          <Divider />
          <p>
            <b>2. How to Create an Account?</b>
          </p>
          <p className="text-justify">
            Accounts are created by the Reachon Express Admin Team
          </p>
          <Divider />
          <p>
            <b>3. Troubleshooting</b>
          </p>
          <p className="text-justify">
            My parcel is delayed. What should I do?
          </p>
          <ul>
            <li>Open the app and check the tracking status.</li>
            <li>
              If no updates are available or the status is stuck, please check
              the courier's official website or contact their customer support.
            </li>
            <li>
              Alternatively, reach out to Reachon Express customer support for
              further assistance.
            </li>
          </ul>
          <Divider />
          <p>
            <b>4. FAQs</b>
          </p>
          <p className="text-justify">Can I track international parcels? </p>
          <ul>
            <li>
              Currently, Reachon Express supports domestic parcel tracking for
              providers like DTDC and Delhivery. We plan to add international
              tracking features in the future.
            </li>
          </ul>
          <p className="text-justify">
            How can I track multiple parcels at once?
          </p>
          <ul>
            <li>
              To track multiple parcels, simply enter each tracking number one
              by one in the app. You can track them simultaneously to see the
              status of each.
            </li>
          </ul>
          <p className="text-justify">
            My tracking number isn’t updating. What do I do?{" "}
          </p>
          <ul>
            <li>
              It may take a while for the courier to update tracking
              information. Please wait for up to 24 hours. If no updates appear
              after this, please contact the courier directly.
            </li>
          </ul>
          <Divider />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelpCenter;
