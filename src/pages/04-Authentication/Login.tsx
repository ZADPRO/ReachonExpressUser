import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import loginImage from "../../assets/login/loginImg.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import decrypt from "../../helper";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const credentials = {
        login: email,
        password: password,
      };

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/Routes/login",
        credentials
      );
      console.log("response", response);

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log("data", data);

      if (data.success) {
        const userDetails = data.userDetails[0];
        console.log("userDetails", userDetails);

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
