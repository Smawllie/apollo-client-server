import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import { cache } from "./cache";
import Login from "./pages/login";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import injectStyles from "./styles";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "https://codecollab.me/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
  typeDefs,
});

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
