import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../utils/network-data";
import { LanguageContext, ToasterContext } from "../App";
import useInput from "../hooks/useInput";

const Register = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { toaster, toggleToaster } = useContext(ToasterContext);
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordConfirmation, setPasswordConfirmation] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (password !== passwordConfirmation) {
      setIsLoading(false);
      return toggleToaster(
        language === "english"
          ? "Password confirmation is not matched"
          : "Konfirmasi kata sandi tidak sesuai"
      );
    }
    const { status, message } = await register({ name, email, password });
    if (status === "success") {
      toggleToaster(message);
      navigate("/login");
    }
    setIsLoading(false);
    toggleToaster(message);
  };

  return (
    <div className="register-wrapper">
      <h1>{language === "english" ? "Register" : "Daftar"}</h1>
      <form className="register-form">
        <input
          type="text"
          placeholder={language === "english" ? "e.g John" : "e.g Budi"}
          value={name}
          onChange={setName}
        />
        <input
          type="email"
          placeholder={
            language === "english"
              ? "e.g johndoe@gmail.com"
              : "budidoremi@gmail.com"
          }
          value={email}
          onChange={setEmail}
        />
        <input
          type="password"
          placeholder={language === "english" ? "e.g John123" : "e.g Budi123"}
          value={password}
          onChange={setPassword}
        />
        <input
          type="password"
          placeholder={
            language === "english"
              ? "Password confirmation"
              : "Konfirmasi kata sandi"
          }
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
        />
        <button
          onClick={onRegisterHandler}
          className="submit-button"
          disabled={isLoading}
        >
          {language === "english" ? "Register" : "Daftar"}
        </button>
        <p className="redirect">
          {language === "english"
            ? "Already have an account?"
            : "Sudah memiliki akun?"}{" "}
          <Link to="/login">
            {language === "english" ? "Login here" : "Masuk di sini"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
