import {
  IonButtons,
  IonCard,
  IonCardContent,
  // IonCardHeader,
  // IonCardSubtitle,
  // IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { search } from "ionicons/icons";
import React, { useEffect, useState } from "react";

import profileImg from "../../assets/profile/profile.svg";

import { HandCoins, Wallet } from "lucide-react";
import { Divider } from "primereact/divider";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Home: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      setUserDetails(JSON.parse(userDetailsString));
    }
  }, []);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Monthly data for the last 8 months
    const data = {
      labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Parcel Booked",
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
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

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className="profileSectionHeader flex align-items-center justify-content-between">
          <div className="profileSecStart flex align-content-center gap-2">
            <img className="profileImage" src={profileImg} alt="" />
            <div className="flex flex-column userNameIntro">
              <h3>
                {userDetails
                  ? `${userDetails.refUserFName} ${userDetails.refUserLName}`
                  : "Loading..."}
              </h3>
              <p>
                {" "}
                {userDetails ? `${userDetails.userTypeName}` : "Loading..."}
              </p>
            </div>
          </div>
          <div className="profileSecEnd">
            <IonButtons slot="end">
              <IonIcon
                className="notificationButton"
                icon={search}
                style={{ fontSize: "23px" }}
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
                    <h3>0.00</h3>
                    <p>Earned This Month</p>
                  </div>
                </div>
                <div className="thisMonthEarned">
                  <HandCoins />
                  <div className="earningsText">
                    <h3>0.00</h3>
                    <p>Previous Month</p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="parcelContents px-3">
          <p>Latest Parcel Tracking</p>
          <p className="w-full text-center">... No Parcel Data Available ...</p>
        </div>

        <Divider />
        <div className="overallStats">
          <p>Total Points - 300</p>
          <Chart type="bar" data={chartData} options={chartOptions} />
          <DataTable
            scrollable
            showGridlines
            className="dataTableStats"
            stripedRows
            value={[
              { sno: 1, month: "Feb", point: 0, price: "₹ 0" },
              { sno: 2, month: "Mar", point: 0, price: "₹ 0" },
              { sno: 3, month: "Apr", point: 0, price: "₹ 0" },
              { sno: 4, month: "May", point: 0, price: "₹ 0" },
            ]}
          >
            <Column
              field="sno"
              frozen
              header="S.No"
              style={{ minWidth: "50px" }}
            ></Column>
            <Column
              field="month"
              header="Month"
              style={{ minWidth: "100px" }}
            ></Column>
            <Column
              field="point"
              header="Parcel"
              style={{ minWidth: "100px" }}
            ></Column>
            <Column
              field="price"
              header="Amount"
              style={{ minWidth: "100px" }}
            ></Column>
          </DataTable>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
