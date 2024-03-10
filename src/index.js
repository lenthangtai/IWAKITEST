import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";
import LoginComponent from "./Components/Login/login";
import LoggedInUserInfoComponent from "./Components/Login/LoggedInUser";
import FormSelect2 from "./Components/formSelect/formSelect2";
import Login2 from "./Components/Login/Login2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);