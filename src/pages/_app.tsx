import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import "fomantic-ui-css/semantic.css";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Header, Input, Sidebar } from "semantic-ui-react";
import "../../styles/globals.css";
import AppSidebar from "../components/AppSidebar";
import { CONVERSATION } from "./conversation/[slug]";

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
      <SlackCloneApp>
        <Component {...pageProps} />
      </SlackCloneApp>
    </ApolloProvider>
  );
}

export default MyApp;

function SlackCloneApp(props) {
  return (
    <div className="app-container">
      <div className="app-menu">
        <AppSidebar />
      </div>
      <AppHeader />
      <div className="app-main">
        <Sidebar.Pusher>{props.children}</Sidebar.Pusher>
      </div>
      <div className="app-input">
        <Input fluid />
      </div>
    </div>
  );
}

function AppHeader() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <div className="app-header">No conversation selected</div>;
  }

  const { loading, error, data } = useQuery(CONVERSATION, {
    variables: { slug },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const conversation = data.conversationBySlug;

  if (!conversation) {
    return <div className="app-header">No such conversation {slug}</div>;
  }

  return (
    <div className="app-header">
      <Header as="h1">{conversation.name}</Header>
    </div>
  );
}
