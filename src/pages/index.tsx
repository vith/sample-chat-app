import faker from "faker";
import Head from "next/head";
import randomInt from "random-int";
import React from "react";
import { Container, Header, Sidebar } from "semantic-ui-react";
import AppSidebar from "../components/AppSidebar";
import { MessageRecord } from "./Message";
import { MessageList } from "./MessageList";

type AppProps = {
  channels: string[];
  directMessages: string[];
};

export default function Index({ channels, directMessages }: AppProps) {
  const messages = generateRandomMessages();
  return (
    <>
      <Head>
        <title>Sample Chat App</title>
      </Head>
      <AppSidebar channels={channels} directMessages={directMessages} />
      <Sidebar.Pusher>
        <Container>
          <Header as="h1">view header</Header>
          <MessageList messages={messages} />
        </Container>
      </Sidebar.Pusher>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      channels: ["#foo", "#bar", "#baz"],
      directMessages: ["user1", "user2"],
    },
  };
}

function generateRandomMessages(): MessageRecord[] {
  const amount = randomInt(3, 7);

  const messages = new Array(amount).fill(null).map(() => {
    const f = faker;

    const id = f.random.uuid();
    const username = f.internet.userName();
    const avatarUrl = f.internet.avatar();
    const content = f.lorem.sentences();
    const timestamp = f.date.recent(1);

    return { id, username, avatarUrl, content, timestamp };
  });

  return messages;
}
