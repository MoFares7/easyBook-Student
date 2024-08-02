import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MaterialUIControllerProvider } from "./context";
import { Provider } from "react-redux";
import store from "./store";
import ErrorBoundary from "./core/error/error";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>

      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
