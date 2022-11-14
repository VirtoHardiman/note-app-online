import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { login, putAccessToken, getUserLogged } from "../utils/network-data";
import { LanguageContext, ToasterContext } from "../App";
import useInput from "../hooks/useInput";

const Login = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { toaster, toggleToaster } = useContext(ToasterContext);
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { status, message, data } = await login({ email, password });
    if (status === "success") {
      putAccessToken(data.accessToken);
      const { status, message, data: userData } = await getUserLogged();
      if (status === "success") {
        localStorage.setItem("username", JSON.stringify(userData.name));
        toggleToaster(message);
        navigate("/note-app-online");
      }
      setIsLoading(false);
      return toggleToaster(message);
    }
    setIsLoading(false);
    toggleToaster(message);
  };

  return (
    <div className="login-wrapper">
      <h1>{language === "english" ? "Login" : "Masuk"}</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder={language === "english" ? "Your email" : "Email anda"}
          value={email}
          onChange={setEmail}
        />
        <input
          type="password"
          placeholder={
            language === "english" ? "Your password" : "Kata sandi anda"
          }
          value={password}
          onChange={setPassword}
        />
        <button
          onClick={onLogin}
          className="submit-button"
          disabled={isLoading}
        >
          {language === "english" ? "Login" : "Masuk"}
        </button>
        <p className="redirect">
          {language === "english" ? "New user?" : "Pengguna baru?"}
          <a href="/register">
            {language === "english" ? "Sign up here" : "Daftar di sini"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
