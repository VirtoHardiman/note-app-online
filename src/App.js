import React, { useState, useEffect, createContext, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoteDetail from "./pages/NoteDetail";
import NoteList from "./pages/NoteList";
import ArchiveList from "./pages/ArchiveList";
import AddNote from "./pages/AddNote";
import NotFound from "./pages/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Toaster from "./components/Toaster";
import "./styles/App.css";

export const ThemeContext = createContext();
export const LanguageContext = createContext();
export const ToasterContext = createContext();

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );
  const [toaster, setToaster] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "bahasa indonesia" : "english";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const toggleToaster = (message) => {
    setToaster(message);
    setTimeout(() => {
      setToaster("");
    }, 2000);
  };

  const themeValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const languageValue = useMemo(() => {
    return {
      language,
      toggleLanguage,
    };
  }, [language]);

  const toasterValue = useMemo(() => {
    return {
      toaster,
      toggleToaster,
    };
  }, [toaster]);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={themeValue}>
        <LanguageContext.Provider value={languageValue}>
          <ToasterContext.Provider value={toasterValue}>
            <Toaster />
            <Navbar />
            <Routes>
              <Route
                exact
                path="/note-app-online/register"
                element={
                  <AuthenticatedRoute checkLoggedIn={true} isRegister={true}>
                    <Register />
                  </AuthenticatedRoute>
                }
              />
              <Route
                exact
                path="/note-app-online/login"
                element={
                  <AuthenticatedRoute checkLoggedIn={true}>
                    <Login />
                  </AuthenticatedRoute>
                }
              />
              <Route
                exact
                path="/note-app-online"
                element={
                  <AuthenticatedRoute>
                    <NoteList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                exact
                path="/note-app-online/archives"
                element={
                  <AuthenticatedRoute>
                    <ArchiveList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                exact
                path="/note-app-online/note/:id"
                element={
                  <AuthenticatedRoute>
                    <NoteDetail />
                  </AuthenticatedRoute>
                }
              />
              <Route
                exact
                path="/note-app-online/new"
                element={
                  <AuthenticatedRoute>
                    <AddNote />
                  </AuthenticatedRoute>
                }
              />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </ToasterContext.Provider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
