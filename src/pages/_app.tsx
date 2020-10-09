import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "fomantic-ui-css/semantic.css";
import Head from "next/head";
import React from "react";
import "../../styles/globals.css";
import { ChatApp } from "../components/ChatApp";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Sample Chat App</title>
      </Head>
      <ChatApp>
        <Component {...pageProps} />
      </ChatApp>
    </ApolloProvider>
  );
}

export default MyApp;
