import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import profileImg from "../../assets/profile/profile.svg";
import { HandCoins, Wallet } from "lucide-react";
import { Divider } from "primereact/divider";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { StatusBar, Style } from "@capacitor/status-bar";
import axios from "axios";
import decrypt from "../../helper";
import { useHistory } from "react-router";

import { useIonViewWillEnter } from "@ionic/react";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getLastTrackingStatus = (parcel: any) => {
  try {
    const statusArray = JSON.parse(parcel.overallStatus || "[]");
    const lastStatus = statusArray[statusArray.length - 1];

    const action = lastStatus?.strAction?.toLowerCase() || "";
    let colorClass = "status-orange"; // default: In Tracking

    if (action.includes("dlv")) {
      colorClass = "status-green";
    } else if (action.includes("failed") || action.includes("undelivered")) {
      colorClass = "status-red";
    } else if (action.includes("booked") || action.includes("manifested")) {
      colorClass = "status-orange";
    }

    const time = moment(lastStatus?.strActionTime, "HHmm");

    return {
      label: `${lastStatus?.strAction || ""} (${
        time.isValid() ? time.format("hh:mm A") : "Coming Soon"
      })`,
      colorClass,
    };
  } catch {
    return { label: "No Status", colorClass: "status-gray" };
  }
};

const Home: React.FC = () => {
  const history = useHistory();

  const [userDetails, setUserDetails] = useState<any>(null);
  const [userParcelDetails, setUserParcelDetails] = useState<any[]>([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartLoading, setChartLoading] = useState(true);
  const [tableData, setTableData] = useState<any[]>([]);
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [prevMonthCount, setPrevMonthCount] = useState(0);

  useEffect(() => {
    // Setup status bar
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

  useIonViewWillEnter(() => {
    getCategory();
  });

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/UserRoutes/userDetails", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res: any) => {
        if (res.error) {
          localStorage.removeItem("userDetails");
          history.replace("/login");
        }
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        if (data.token) {
          localStorage.setItem("JWTtoken", "Bearer " + data.token);
          setUserParcelDetails(data.userParcelData);
        } else {
          localStorage.removeItem("userDetails");
          history.replace("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  useEffect(() => {
    if (!userParcelDetails || userParcelDetails.length === 0) return;

    const statsMap = {};
    monthLabels.forEach((month) => {
      statsMap[month] = { count: 0, total: 0 };
    });

    const now = moment();
    const currentMonth = now.month();
    const previousMonth = moment().subtract(1, "month").month();
    let thisMonth = 0;
    let prevMonth = 0;

    userParcelDetails.forEach((parcel) => {
      const bookingDate = moment(parcel.dsr_booking_date, "DD-MM-YYYY");
      const month = bookingDate.format("MMM");

      if (statsMap[month]) {
        statsMap[month].count += 1;
        statsMap[month].total += Number(parcel.netamount || 0);
      }

      if (bookingDate.month() === currentMonth) {
        thisMonth += 1;
      } else if (bookingDate.month() === previousMonth) {
        prevMonth += 1;
      }
    });

    setThisMonthCount(thisMonth);
    setPrevMonthCount(prevMonth);

    const table = monthLabels.map((month, index) => ({
      sno: index + 1,
      month: month,
      point: statsMap[month].count,
      price: `₹ ${statsMap[month].total.toFixed(2)}`,
    }));
    setTableData(table);

    setChartData({
      labels: monthLabels,
      datasets: [
        {
          label: "Parcel Booked",
          data: monthLabels.map((month) => statsMap[month].count),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });

    setChartLoading(false);
  }, [userParcelDetails]);

  const lastParcel =
    userParcelDetails && userParcelDetails.length > 0
      ? [...userParcelDetails].sort((a, b) =>
          moment(b.dsr_booking_date, "DD-MM-YYYY").diff(
            moment(a.dsr_booking_date, "DD-MM-YYYY")
          )
        )[0]
      : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="profileSectionHeader p-3 flex align-items-center justify-content-between">
            <div className="profileSecStart flex align-content-center gap-2">
              <img className="profileImage" src={profileImg} alt="" />
              <div className="flex flex-column userNameIntro">
                <h3>{userDetails?.refCustomerName || "Loading..."}</h3>
                <p>Customer</p>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contentContainer">
          <IonCard className="ion-card-custom">
            <IonCardContent>
              <div className="walletPointsContainer">
                <div
                  className="thisMonthEarned"
                  onClick={() => history.push("/shipment")}
                >
                  <Wallet />
                  <div className="earningsText">
                    <h3>{thisMonthCount}</h3>
                    <p>Parcel This Month</p>
                  </div>
                </div>
                <div
                  className="thisMonthEarned"
                  onClick={() => history.push("/shipment")}
                >
                  <HandCoins />
                  <div className="earningsText">
                    <h3>{prevMonthCount}</h3>
                    <p>Previous Month</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="p-2"></div>

        <div className="parcelContents px-2">
          <p>Latest Parcel Tracking</p>
          {lastParcel ? (
            <div className="px-3 py-3 mt-2 shadow-2 surface-card border-round-lg mb-3">
              <div className="flex justify-content-between mb-2">
                <p className="m-0 font-semibold text-sm text-500">
                  Leaf: {lastParcel.dsr_cnno}
                </p>
                {(() => {
                  const { label, colorClass } =
                    getLastTrackingStatus(lastParcel);
                  return (
                    <p className={`m-0 font-medium text-sm ${colorClass}`}>
                      {label}
                    </p>
                  );
                })()}
              </div>
              <div className="flex justify-content-between mb-2">
                <p className="m-0 text-sm">
                  <strong>Pieces:</strong> {lastParcel.dsr_no_of_pieces} ({" "}
                  {lastParcel.dsr_contents} )
                </p>
              </div>
              <div className="text-sm text-600 flex justify-content-between">
                <p className="m-0">
                  <strong>Destination:</strong>
                  {lastParcel.dsr_dest_pin} ({lastParcel.dsr_dest} )
                </p>
                {/* <p className="m-0">
                  <strong>Time:</strong>{" "}
                  {moment(lastParcel.dsr_booking_time, "HH:mm:ss").format(
                    "hh:mm A"
                  )}
                </p> */}
              </div>
            </div>
          ) : (
            <p className="w-full text-center">
              ... No Parcel Data Available ...
            </p>
          )}
        </div>

        <Divider />
        <div className="overallStats px-3">
          <p>Total Parcel Booking - {userParcelDetails?.length}</p>

          {chartLoading ? (
            <div className="flex justify-content-center my-3">
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </div>
          ) : (
            <Chart type="bar" data={chartData} options={chartOptions} />
          )}

          <DataTable scrollable showGridlines stripedRows value={tableData}>
            <Column field="sno" header="S.No" style={{ minWidth: "50px" }} />
            <Column
              field="month"
              header="Month"
              style={{ minWidth: "100px" }}
            />
            <Column
              field="point"
              header="Parcel"
              style={{ minWidth: "100px" }}
            />
            {/* <Column
              field="price"
              header="Amount"
              style={{ minWidth: "100px" }}
            /> */}
          </DataTable>
        </div>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Home;
