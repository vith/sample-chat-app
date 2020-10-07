import Head from "next/head";
import { Container, Sidebar } from "semantic-ui-react";
import AppSidebar from "../components/AppSidebar";

type AppProps = {
  channels: string[];
  directMessages: string[];
};

export default function Index({ channels, directMessages }: AppProps) {
  return (
    <>
      <Head>
        <title>Sample Chat App</title>
      </Head>
      <AppSidebar channels={channels} directMessages={directMessages} />
      <Sidebar.Pusher>
        <Container>
          <p>Main content</p>
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
