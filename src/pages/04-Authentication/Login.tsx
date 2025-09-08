import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonLoading,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import decrypt from "../../helper";
import { useHistory } from "react-router";

import topBg from "../../assets/login/top2.png";

import { StatusBar, Style } from "@capacitor/status-bar";
import { Divider } from "primereact/divider";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false); // 🔑 loader state
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
      setCheckingAuth(false);
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true); // show loader
    setError("");

    try {
      const credentials = { username: email, password };

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
        const userDetails = data.userDetails;

        localStorage.setItem("JWTtoken", "Bearer " + data.token);
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        setEmail("");
        setPassword("");
        history.push("/home");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // hide loader
    }
  };

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* 🔄 Loader */}
        <IonLoading
          isOpen={loading}
          message={"Logging in..."}
          spinner="crescent"
        />

        <div className="topImWrapper">
          <img src={topBg} alt="Top" className="topIm" />
        </div>
        <div className="formWrapper">
          <div>
            <p className="uppercase text-2xl font-bold">Sign In</p>
            <p className="mt-2">Welcome Back, You've been missed !</p>

            <IonInput
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
              className="mt-4 custom-input"
              mode="md"
              label="Username"
              labelPlacement="floating"
              fill="outline"
              placeholder="Username"
            />
            <IonInput
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
              className="mt-3 custom-input"
              mode="md"
              label="Password"
              labelPlacement="floating"
              fill="outline"
              placeholder="Password"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <IonButton
              expand="block"
              className="uppercase customBtn my-4"
              onClick={handleLogin}
              disabled={loading} // prevent double click
            >
              LOGIN
            </IonButton>

            <Divider />

            <p className="text-center">Don't Have an Account?</p>
            <p
              className="text-center font-bold cursor-pointer"
              onClick={() => history.push("/signUpInst")}
            >
              ...Click Here...
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
