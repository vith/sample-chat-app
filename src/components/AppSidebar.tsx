import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Placeholder, Sidebar } from "semantic-ui-react";

const CONVERSATIONS = gql`
  query GetConversationList {
    conversations {
      id
      name
      slug
      type
    }
  }
`;

/* type AppSidebarProps = {
  channels: string[];
  directMessages: string[];
}; */

export default function AppSidebar(/* {
  channels,
  directMessages,
}: AppSidebarProps */) {
  const router = useRouter();
  const { loading, error, data } = useQuery(CONVERSATIONS);

  if (loading) return <Placeholder />;
  if (error) return <p>Error</p>;

  const { slug } = router.query;

  const { conversations } = data;

  const groupConversations = conversations.filter((c) => c.type === "group");
  const dmConversations = conversations.filter((c) => c.type === "dm");

  const channelComponents = groupConversations.map((conv) => (
    <Menu.Item key={conv.id} active={conv.slug === slug}>
      <Link href={`/conversation/${conv.slug}`}>{conv.name}</Link>
    </Menu.Item>
  ));

  const dmComponents = dmConversations.map((dm) => (
    <Menu.Item key={dm.id}>
      <Link href={`/conversation/${dm.slug}`}>{dm.name}</Link>
    </Menu.Item>
  ));

  return (
    <Sidebar as={Menu} visible vertical animation="push">
      <Menu.Item>
        <Menu.Header>Channels</Menu.Header>
        <Menu.Menu>{channelComponents}</Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Direct Messages</Menu.Header>
        <Menu.Menu>{dmComponents}</Menu.Menu>
      </Menu.Item>
    </Sidebar>
  );
}
