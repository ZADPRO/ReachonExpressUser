import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";

const Reviews: React.FC = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const [submittedReviews, setSubmittedReviews] = useState<any[]>([
    {
      name: "John Doe",
      rating: 5,
      comment: "Amazing app! Helped me track everything with ease.",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Very useful, but I’d love a dark mode option!",
    },
  ]);

  const handleSubmit = () => {
    if (!name || !comment) return;

    const newReview = {
      name,
      rating,
      comment,
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    setName("");
    setRating(5);
    setComment("");
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

        {/* Review Form */}
        <div className="reviewForm" style={{ padding: "16px" }}>
          <IonItem>
            <IonLabel position="floating">Your Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Your Feedback</IonLabel>
            <IonTextarea
              value={comment}
              rows={3}
              onIonChange={(e) => setComment(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Rating</IonLabel>
            <IonSelect
              value={rating}
              placeholder="Select"
              onIonChange={(e) => setRating(e.detail.value)}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <IonSelectOption key={r} value={r}>
                  {r} Stars
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonButton
            expand="block"
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}
          >
            Submit Review
          </IonButton>
        </div>

        {/* Submitted Reviews */}
        <div style={{ padding: "16px" }}>
          <IonList>
            {submittedReviews.map((review, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{review.name}</IonCardTitle>
                  <IonCardSubtitle>{review.rating} ★</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>{review.comment}</IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Reviews;
