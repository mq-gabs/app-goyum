import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./hooks/user.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
    <ToastContainer theme="light" hideProgressBar />
  </React.StrictMode>
);
