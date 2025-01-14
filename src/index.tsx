import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

import './index.css'; // Подключение CSS переменных
import { Provider } from "react-redux";
import { store } from "./redux/store";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
