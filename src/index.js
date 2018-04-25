import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "tachyons/css/tachyons.min.css";
import "./main.css";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
