import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "fomantic-ui-css/semantic.css";
import Head from "next/head";
import React from "react";
import { Container, Sidebar } from "semantic-ui-react";
import "../../styles/globals.css";
import AppSidebar from "../components/AppSidebar";

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
      <AppSidebar />
      <Sidebar.Pusher>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Sidebar.Pusher>
    </ApolloProvider>
  );
}

export default MyApp;
