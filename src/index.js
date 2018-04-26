import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "tachyons/css/tachyons.min.css";
import "./main.css";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  fetchOptions: {
    credentials: "include"
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
    }
    if (networkError) {
      console.log(networkError);
    }
  },
  clientState: {
    defaults: {
      hello: { message: "Hello World.", __typename: "HelloMessage" }
    },
    resolvers: {
      Query: {
        hello: (_, { message }, { cache }) => {
          cache.writeData({
            message,
            __typename: "HelloMessage"
          });
        }
      }
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={() => <div>404!</div>} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
