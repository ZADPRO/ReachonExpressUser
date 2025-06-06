import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import loginImage from "../../assets/login/loginImg.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import decrypt from "../../helper";
import { useHistory } from "react-router";

import { StatusBar, Style } from "@capacitor/status-bar"; // Import StatusBar and Style

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true); // loading state
  const history = useHistory();

  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });

    return () => {
      StatusBar.setOverlaysWebView({ overlay: true });
    };
  }, []);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      history.replace("/home");
    } else {
      setCheckingAuth(false); // only show login once check is done
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const credentials = {
        username: email,
        password: password,
      };

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/userLogin",
        credentials
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.success) {
        console.log("data", data);
        const userDetails = data.userDetails;

        localStorage.setItem("JWTtoken", "Bearer " + data.token);
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        history.push("/home");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (checkingAuth) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <IonPage>
      <IonContent>
        <div className="loginPage">
          <img src={loginImage} alt="" />
          <p>Monitor Your Package's Journey At Every Stage</p>

          <InputText
            placeholder="Enter User Name"
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Password
            placeholder="Enter Password"
            toggleMask
            feedback={false}
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button
            severity="success"
            label="Login"
            className="mt-3"
            onClick={handleLogin}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
