import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonSearchbar,
  IonSkeletonText,
  IonToolbar,
  useIonViewWillEnter, // 🔥 NEW
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { StatusBar, Style } from "@capacitor/status-bar";
import axios from "axios";
import decrypt from "../../helper";
import { useHistory } from "react-router";
import moment from "moment";
import { Divider } from "primereact/divider";

const getLastTrackingStatus = (parcel: any) => {
  try {
    const statusArray = JSON.parse(parcel.overallStatus || "[]");
    const lastStatus = statusArray[statusArray.length - 1];
    const action = lastStatus?.strAction?.toLowerCase() || "";

    let colorClass = "status-orange"; // default: In Tracking
    if (action.includes("DLV")) colorClass = "status-green";
    else if (action.includes("failed") || action.includes("undelivered"))
      colorClass = "status-red";
    else if (action.includes("booked") || action.includes("manifested"))
      colorClass = "status-orange";

    return {
      label: `${lastStatus?.strAction || "-"} (${
        moment(lastStatus?.strActionTime, "HHmm").format("hh:mm A") || "--"
      })`,
      color: colorClass,
    };
  } catch {
    return { label: "No Status", color: "status-gray" };
  }
};

const Shipment: React.FC = () => {
  const history = useHistory();
  const [userParcelDetails, setUserParcelDetails] = useState<any[]>([]);
  const [groupedParcels, setGroupedParcels] = useState<any>({});
  const [loading, setLoading] = useState(true); // 🔥 NEW
  const [searchText, setSearchText] = useState("");

  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  useIonViewWillEnter(() => {
    getCategory();
  });

  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });

    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      setUserDetails(JSON.parse(userDetailsString));
    }

    getCategory();

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true });
    };
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/UserRoutes/userDetails", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        if (data.token) {
          localStorage.setItem("JWTtoken", "Bearer " + data.token);
          setUserParcelDetails(data.userParcelData);
          groupByDate(data.userParcelData);
        } else {
          history.push("/home");
        }
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      })
      .finally(() => setLoading(false)); // 🔥 NEW
  };

  const groupByDate = (parcels: any[], filter = "") => {
    const filtered = parcels.filter((parcel) => {
      const lower = filter.toLowerCase();
      return (
        parcel.dsr_cnno?.toLowerCase().includes(lower) ||
        parcel.dsr_dest?.toLowerCase().includes(lower) ||
        parcel.dsr_dest_pin?.includes(lower) ||
        parcel.dsr_contents?.toLowerCase().includes(lower)
      );
    });

    const grouped = filtered.reduce((acc, parcel) => {
      const dateKey = moment(parcel.dsr_booking_date, "DD-MM-YYYY").format(
        "DD MMM YYYY"
      );
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(parcel);
      return acc;
    }, {} as Record<string, any[]>);

    setGroupedParcels(grouped);
  };

  const renderSkeletonCard = () => (
    <>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="my-3">
          <div className="px-4 py-3 shadow-2 surface-card border-round-lg mb-3">
            <IonSkeletonText
              animated
              style={{ width: "60%", height: "16px" }}
            />
            <IonSkeletonText
              animated
              style={{ width: "40%", height: "14px", marginTop: "10px" }}
            />
            <IonSkeletonText
              animated
              style={{ width: "80%", height: "14px", marginTop: "10px" }}
            />
            <IonSkeletonText
              animated
              style={{ width: "50%", height: "14px", marginTop: "10px" }}
            />
          </div>
        </div>
      ))}
    </>
  );

  useEffect(() => {
    groupByDate(userParcelDetails, searchText);
  }, [searchText, userParcelDetails]);

  return (
    <>
      <style>{`
        .status-green { color: #16a34a; }
        .status-orange { color: #f97316; }
        .status-red { color: #dc2626; }
        .status-gray { color: #6b7280; }
      `}</style>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="profileSectionHeader flex align-items-center justify-content-between">
              <div className="profileSecStart flex align-content-center gap-2">
                <IonBackButton
                  defaultHref="/home"
                  icon={chevronBack}
                  mode="md"
                  style={{ color: "white" }}
                />
                <div className="flex flex-column userNameIntro">
                  <h3>Transactions</h3>
                </div>
              </div>
            </div>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder="Search Parcel Details here..."
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value!)}
            />{" "}
          </IonToolbar>
        </IonHeader>{" "}
        <IonContent className="m-3">
          <div className="parcelDetails px-2">
            {loading ? (
              renderSkeletonCard() // 🔥 NEW
            ) : Object.keys(groupedParcels).length > 0 ? (
              Object.entries(groupedParcels)
                .sort(
                  (a, b) =>
                    moment(b[0], "DD MMM YYYY").valueOf() -
                    moment(a[0], "DD MMM YYYY").valueOf()
                )
                .map(([date, parcels]: any) => (
                  <div key={date}>
                    <div className="flex mt-3 align-items-center justify-content-between">
                      <p className="font-bold">{date} </p>
                      <p>
                        ({parcels.length}{" "}
                        {parcels.length === 1 ? "parcel" : "parcels"})
                      </p>
                    </div>
                    {parcels.map((parcel: any, index: number) => {
                      const { label, color } = getLastTrackingStatus(parcel);
                      return (
                        <div
                          key={index}
                          className="my-3"
                          onClick={() => {
                            setSelectedParcel(parcel);
                            setIsModalOpen(true);
                          }}
                        >
                          <div className="px-3 py-3 shadow-2 surface-card border-round-lg mb-3">
                            <div className="flex justify-content-between mb-2">
                              <p className="m-0 font-semibold text-sm text-500">
                                Leaf: {parcel.dsr_cnno}
                              </p>
                              <p className={`m-0 font-medium text-sm ${color}`}>
                                {label}
                              </p>
                            </div>
                            <div className="flex justify-content-between mb-2">
                              <p className="m-0 text-sm">
                                <strong>Pieces:</strong>{" "}
                                {parcel.dsr_no_of_pieces} ({parcel.dsr_contents}{" "}
                                )
                              </p>
                              {/* <p className="m-0 text-sm">
                                <strong>Weight:</strong> {parcel.dsr_cn_weight}{" "}
                                kg
                              </p> */}
                            </div>
                            <div className="text-sm text-600 flex justify-content-between">
                              <p className="m-0">
                                <strong>Destination:</strong>
                                {parcel.dsr_dest_pin}
                              </p>
                              <p className="m-0">
                                <strong>Time:</strong>{" "}
                                {moment(
                                  parcel.dsr_booking_time,
                                  "HH:mm:ss"
                                ).format("hh:mm A")}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <Divider />
                  </div>
                ))
            ) : (
              <p className="w-full text-center">
                ... No Parcel Data Available ...
              </p>
            )}
          </div>

          <IonModal
            isOpen={isModalOpen}
            onDidDismiss={() => setIsModalOpen(false)}
          >
            <IonHeader>
              <IonToolbar>
                <div className="p-2 flex justify-content-between align-items-center">
                  <h3 className="m-0">Parcel Details</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      fontSize: "1.5rem",
                      background: "none",
                      border: "none",
                    }}
                  >
                    &times;
                  </button>
                </div>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              {selectedParcel ? (
                <div className="flex flex-column gap-3">
                  <div>
                    <strong>CN Number:</strong> {selectedParcel.dsr_cnno}
                  </div>
                  <div>
                    <strong>Destination:</strong> {selectedParcel.dsr_dest}
                  </div>
                  <div>
                    <strong>No. of Pieces:</strong>{" "}
                    {selectedParcel.dsr_no_of_pieces}
                  </div>
                  <div>
                    <strong>Destination Pincode:</strong>{" "}
                    {selectedParcel.dsr_dest_pin}
                  </div>
                  <div>
                    <strong>Booking Date:</strong>{" "}
                    {selectedParcel.dsr_booking_date}
                  </div>
                  <div>
                    <strong>Booking Time:</strong>{" "}
                    {moment(selectedParcel.dsr_booking_time, "HH:mm:ss").format(
                      "hh:mm A"
                    )}
                  </div>
                  {/* <div>
                    <strong>Amount:</strong> ₹{selectedParcel.dsr_amt}
                  </div> */}
                  <div>
                    <strong>Contents:</strong> {selectedParcel.dsr_contents}
                  </div>
                  <div>
                    <strong>Status:</strong> {selectedParcel.tempStatus}
                  </div>
                </div>
              ) : (
                <p>No parcel selected.</p>
              )}
            </IonContent>
          </IonModal>
        </IonContent>
        <IonFooter></IonFooter>
      </IonPage>
    </>
  );
};

export default Shipment;
