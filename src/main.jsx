import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../State/store.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  gray: {
    backGround: "#131A25",
    mainColor: "#3BD671",
    lightBackGround: "#2D3340",
  },
};

export const theme = extendTheme({
  colors: colors,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>
);
