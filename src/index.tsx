import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import { SocketContextProvider } from "./Context/SocketContext";

// translations
import common_en from "./translations/en/common.json";
import common_es from "./translations/es/common.json";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en",
  resources: {
    en: {
      common: common_en,
    },
    es: {
      common: common_es,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <SocketContextProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
