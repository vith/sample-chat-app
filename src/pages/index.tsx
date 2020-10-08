import React from "react";
import { Header } from "semantic-ui-react";

/* type AppProps = {
  channels: string[];
  directMessages: string[];
}; */

export default function Index(/* { channels, directMessages }: AppProps */) {
  // const messages = generateRandomMessages();
  return <Header as="h1">No conversation selected</Header>;
}

/* export async function getStaticProps(context) {
  return {
    props: {
      channels: ["#foo", "#bar", "#baz"],
      directMessages: ["user1", "user2"],
    },
  };
} */

/* function generateRandomMessages(): MessageRecord[] {
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
} */
