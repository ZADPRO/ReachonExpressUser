import {
  IonBackButton,
  IonButton,
  IonContent,
  IonPage,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style

const Reviews: React.FC = () => {
  useEffect(() => {
    // Adjust the status bar appearance
    StatusBar.setOverlaysWebView({ overlay: false }); // Ensure content does not overlap the status bar
    StatusBar.setStyle({ style: Style.Dark }); // Correct way to set the style (Dark or Light)

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true }); // Reset when component unmounts (optional)
    };
  }, []);

  const [rating, setRating] = useState<number>(5); // Default rating 5 (very good)
  console.log("rating", rating);
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false); // State to control the toast visibility

  const handleSubmit = () => {
    if (!comment) return;

    setComment("");
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonContent>
        {/* Header */}
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <IonBackButton
              defaultHref="/settings"
              icon={chevronBack}
              mode="md"
              style={{ color: "white" }}
            />
            <div className="flex flex-column userNameIntro">
              <h3>Reviews</h3>
            </div>
          </div>
        </div>

        <div className="shareYourReview p-3">
          <p>Share Your Review</p>
          <p>How was your experience?</p>

          {/* Rating Emojis */}
          <div>
            <button onClick={() => setRating(1)} style={{ fontSize: "24px" }}>
              😞
            </button>
            <button onClick={() => setRating(3)} style={{ fontSize: "24px" }}>
              🙂
            </button>
            <button onClick={() => setRating(5)} style={{ fontSize: "24px" }}>
              😍
            </button>
          </div>

          {/* Text Area for Comment */}
          <IonTextarea
            value={comment}
            onIonChange={(e) => setComment(e.detail.value!)}
            placeholder="Your comment..."
            rows={5}
            className="textInputFeedback"
            style={{ marginTop: "10px" }}
          />

          <IonButton
            onClick={handleSubmit}
            expand="block"
            className="submitBtn"
            style={{ marginTop: "20px", backgroundColor: "#202d71" }}
          >
            Submit Review
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          message="Thanks for your review!"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Reviews;
