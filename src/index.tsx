import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = extendTheme({
  shadows: {
    outline: "none",
  },
  fonts: {
    heading: "Raleway, sans-serif",
    body:
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
  },
  components: {
    Text: {
      variants: {
        defaultProps: {
          size: "lg",
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Raleway, sans-serif",
        color: mode("gray.700", "whiteAlpha.900")(props),
        bg: mode("gray.50", "gray.900")(props),
        lineHeight: "base",
      },
      section: {
        bg: mode("white", "gray.900")(props),
        boxShadow: "md",
        w: "100%",
      },
      p: {
        fontFamily: "'Source Serif Pro', serif",
      },
    }),
  },
});

const ReactApp = (
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  ReactDOM.hydrate(ReactApp, rootElement);
} else {
  ReactDOM.render(ReactApp, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);
