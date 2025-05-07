import { IonBackButton, IonContent, IonPage } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Divider } from "primereact/divider";
import React, { useEffect } from "react";

import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style

const TermsPolicy: React.FC = () => {
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
              <h3>Terms & Privacy Policy</h3>
            </div>
          </div>
        </div>

        <div className="terms px-3">
          <p className="uppercase underline">
            <b>Terms & Conditions</b>
          </p>
          <p>
            <b>1. Introduction</b>
          </p>
          <p className="text-justify">
            Welcome to Reachon Express, a leading courier service provider in
            India. These Terms & Conditions govern your use of our courier
            services through the mobile application and website. By using our
            services, you agree to comply with and be bound by these terms.
          </p>
          <Divider />
          <p>
            <b>2. Services</b>
          </p>
          <p className="text-justify">
            Our mobile application offers booking services for parcel shipments,
            including domestic, express, and international deliveries. You can
            book, track, and pay for deliveries through the application.
          </p>
          <Divider />

          <p>
            <b>3. Booking Details</b>
          </p>
          <p className="text-justify">
            When booking a parcel, you will be required to provide certain
            details, including:
          </p>
          <ul>
            <li>Date of booking Origin and destination addresses</li>
            <li>Weight and dimensions</li>
            <li>Content description</li>
            <li>Mode of delivery (Surface, Air, or Express)</li>
            <li>Payment method (Cash, Gpay, Credit)</li>
          </ul>
          <p className="text-justify">
            You agree that all information provided is accurate and truthful.
          </p>
          <Divider />

          <p>
            <b>4. Payment Terms</b>
          </p>
          <p className="text-justify">Payment for services can be made via:</p>
          <ul>
            <li>Cash on Delivery (COD)</li>
            <li>
              Prepaid (via Gpay or credit) For credit customers, outstanding
              amounts must be settled as per the payment schedule.
            </li>
          </ul>
          <Divider />

          <p>
            <b>5. Delivery & Tracking</b>
          </p>
          <p className="text-justify">
            Once the booking is confirmed, you will receive a tracking number.
            You can track your parcel in real-time using our mobile application.
          </p>
          <Divider />

          <p>
            <b>6. Customer Responsibilities</b>
          </p>
          <p className="text-justify">
            You are responsible for the accuracy of the information provided
            during the booking. [Your Company Name] will not be liable for any
            delays or issues caused by incorrect or incomplete details.
          </p>
          <Divider />

          <p>
            <b>7. Liability</b>
          </p>
          <p className="text-justify">
            We ensure safe handling and timely delivery, but are not responsible
            for any damage, loss, or delay caused due to factors beyond our
            control (e.g., weather, strikes, etc.).
          </p>
          <Divider />

          <p>
            <b>8. Privacy Policy</b>
          </p>
          <p className="text-justify">
            Please review our Privacy Policy to understand how your data is
            collected, used, and protected.
          </p>
          <Divider />

          <p>
            <b>9. Amendments</b>
          </p>
          <p className="text-justify">
            We may modify these terms and conditions at any time. You will be
            notified of any major changes.
          </p>
          <Divider />

          {/* ====================================== */}

          <div className="terms">
            <p className="uppercase underline">
              <b>Privacy Policy</b>
            </p>
            <p>
              <b>1. Introduction</b>
            </p>
            <p className="text-justify">
              Reachon Express, values your privacy and is committed to
              protecting your personal information. This Privacy Policy outlines
              how we collect, use, and protect your data when using our mobile
              application and services.
            </p>
            <Divider />
            <p>
              <b>2. Data Collection</b>
            </p>
            <p className="text-justify">
              We collect the following types of personal data:
            </p>
            <ul>
              <li>Name, email, phone number</li>
              <li>Address and delivery details</li>
              <li>Payment information (for prepaid services)</li>
              <li>Parcel details (weight, dimensions, content)</li>
            </ul>
            <Divider />
            <p>
              <b>3. Data Usage</b>
            </p>
            <p className="text-justify">Your personal data is used to: </p>
            <ul>
              <li>Process bookings and deliveries</li>
              <li>Provide customer support</li>
              <li>Send updates and notifications regarding your parcel</li>
              <li>Process payments and issue receipts/invoices</li>
              <li>Improve service quality</li>
            </ul>
            <Divider />
            <p>
              <b>4. Data Security</b>
            </p>
            <p className="text-justify">
              We implement robust security measures to protect your data,
              including encryption and secure servers. However, we cannot
              guarantee 100% security against unauthorized access.
            </p>

            <Divider />
            <p>
              <b>5. Data Sharing</b>
            </p>
            <p className="text-justify">
              We do not share your personal data with third parties except:
            </p>
            <ul>
              <li>
                For the purpose of parcel delivery (e.g., vendors like DTDC,
                Bluedart, Delhivery)
              </li>
              <li>
                With service providers who assist in operating our app (e.g.,
                payment processors)
              </li>
            </ul>
            <Divider />
            <p>
              <b>6. User Rights</b>
            </p>
            <p className="text-justify">You have the right to:</p>
            <ul>
              <li>Access and update your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of receiving marketing communications</li>
            </ul>
            <Divider />
            <p>
              <b>7. Changes to Privacy Policy</b>
            </p>
            <p className="text-justify">
              We may update this Privacy Policy. Users will be notified of
              significant changes.
            </p>

            <Divider />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsPolicy;
