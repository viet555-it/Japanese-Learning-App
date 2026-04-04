import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PreferenceProvider } from "./context/PreferenceContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <PreferenceProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PreferenceProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);