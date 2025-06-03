import {
  IonButtons,
  IonCard,
  IonCardContent,
  // IonCardHeader,
  // IonCardSubtitle,
  // IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { search } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May"];

const Home: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true });
    };
  }, []);

  const [userDetails, setUserDetails] = useState<any>(null);
  const [userParcelDetails, setUserParcelDetails] = useState<any[]>([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartLoading, setChartLoading] = useState(true);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      setUserDetails(JSON.parse(userDetailsString));
    }
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
        if (data.token) {
          console.log("data line 62", data);
          localStorage.setItem("JWTtoken", "Bearer " + data.token);
          setUserParcelDetails(data.userParcelData);
        } else {
          history.push("/home");
        }
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  useEffect(() => {
    // Initialize empty stats map
    const statsMap = {};
    monthLabels.forEach((month) => {
      statsMap[month] = { count: 0, total: 0 };
    });

    // Fill statsMap with real data
    userParcelDetails?.forEach((parcel) => {
      if (parcel.createdat) {
        const date = moment(parcel.createdat);
        const month = date.format("MMM"); // e.g. "Jan"
        if (statsMap[month]) {
          statsMap[month].count += 1;
          statsMap[month].total += Number(parcel.netamount) || 0;
        }
      }
    });

    // Prepare data for DataTable
    const transformedTableData = monthLabels.map((month, index) => ({
      sno: index + 1,
      month: month,
      point: statsMap[month].count,
      price: `₹ ${statsMap[month].total}`,
    }));

    setTableData(transformedTableData);

    // Prepare data for Chart
    const chartData = {
      labels: monthLabels,
      datasets: [
        {
          label: "Parcel Booked",
          data: monthLabels.map((month) => statsMap[month].count),
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(255, 99, 132)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          max: 200,
        },
      },
    };

    setTimeout(() => {
      setChartData(chartData);
      setChartOptions(options);
      setChartLoading(false);
    }, 500);
  }, [userParcelDetails]);

  const lastParcel =
    userParcelDetails && userParcelDetails.length > 0
      ? userParcelDetails[0]
      : null;

  useEffect(() => {
    if (!userParcelDetails || userParcelDetails.length === 0) return;

    // Step 1: Group data by month
    const monthlyData = userParcelDetails.reduce((acc, parcel) => {
      const date = dayjs(parcel.createdat);
      const month = date.format("MMM"); // e.g., "May"
      const yearMonth = date.format("YYYY-MM"); // ensure unique year+month

      if (!acc[yearMonth]) {
        acc[yearMonth] = { month, count: 0, totalAmount: 0 };
      }

      acc[yearMonth].count += 1;
      acc[yearMonth].totalAmount += parseFloat(parcel.netamount || "0");

      return acc;
    }, {});

    // Step 2: Convert to array with S.No
    const formattedData = Object.entries(monthlyData).map(
      ([_, data], index) => ({
        sno: index + 1,
        month: data.month,
        point: data.count,
        price: `₹ ${data.totalAmount}`,
      })
    );

    setTableData(formattedData);
  }, [userParcelDetails]);

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <img className="profileImage" src={profileImg} alt="" />
            <div className="flex flex-column userNameIntro">
              <h3>
                {userDetails ? `${userDetails.refCustomerName}` : "Loading..."}
              </h3>
              <p>Customer</p>
            </div>
          </div>
          <div className="profileSecEnd">
            <IonButtons slot="end">
              <IonIcon
                className="notificationButton"
                icon={search}
                style={{ fontSize: "23px" }}
                onClick={() => history.push("/shipment")}
              />
            </IonButtons>
          </div>
        </div>

        <div className="contentContainer">
          <IonCard className="ion-card-custom">
            <IonCardContent>
              <div className="walletPointsContainer">
                <div className="thisMonthEarned">
                  <Wallet />
                  <div className="earningsText">
                    <h3>{userParcelDetails?.length}</h3>
                    <p>Parcel This Month</p>
                  </div>
                </div>
                <div className="thisMonthEarned">
                  <HandCoins />
                  <div className="earningsText">
                    <h3>{userParcelDetails?.length}</h3>
                    <p>Previous Month</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="parcelContents px-3">
          <p>Latest Parcel Tracking</p>
          {lastParcel ? (
            <div className="card border-1 p-2" style={{ borderRadius: "10px" }}>
              <div className="flex justify-content-between py-2">
                <p className="m-0">
                  <strong>Vendor:</strong> {lastParcel.vendor}
                </p>
                <p className="m-0">
                  <strong>
                    {" "}
                    {lastParcel.result?.success ? "Booked" : "Failed"}
                  </strong>
                </p>
              </div>
              <p className="m-0 py-1">
                <strong>Time :</strong>{" "}
                {moment(lastParcel.createdat).format("DD-MM-YY, hh:mm A")}
              </p>
              <p className="m-0 py-1">
                <strong>From:</strong> {lastParcel.consignoraddress}
              </p>
              <p className="m-0 py-1">
                <strong>To:</strong> {lastParcel.consigneeaddress}
              </p>
            </div>
          ) : (
            <p className="w-full text-center">
              ... No Parcel Data Available ...
            </p>
          )}
        </div>

        <Divider />
        <div className="overallStats">
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

          <DataTable
            scrollable
            showGridlines
            className="dataTableStats"
            stripedRows
            value={tableData}
          >
            <Column
              field="sno"
              frozen
              header="S.No"
              style={{ minWidth: "50px" }}
            />
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
            <Column
              field="price"
              header="Amount"
              style={{ minWidth: "100px" }}
            />
          </DataTable>
        </div>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Home;
