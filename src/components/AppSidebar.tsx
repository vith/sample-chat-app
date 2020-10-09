import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Icon, Menu, Placeholder, Sidebar } from "semantic-ui-react";
import {
  ConversationList,
  CONVERSATION_LIST,
} from "../queries/CONVERSATION_LIST";

export default function AppSidebar() {
  const router = useRouter();
  const { loading, error, data } = useQuery<ConversationList>(
    CONVERSATION_LIST
  );

  if (loading) return <Placeholder />;
  if (error) return <p>Error</p>;

  const { slug } = router.query;

  const { conversations } = data;

  const groupConversations = conversations.filter((c) => c.type === "group");
  const dmConversations = conversations.filter((c) => c.type === "dm");

  const renderConversation = (conv) => (
    <Menu.Item key={conv.id} active={conv.slug === slug}>
      <Link href={`/conversation/${conv.slug}`}>{conv.name}</Link>
    </Menu.Item>
  );

  const channelComponents = groupConversations.map(renderConversation);
  const dmComponents = dmConversations.map(renderConversation);

  return (
    <Sidebar as={Menu} visible vertical animation="push">
      <Menu.Item>
        <div className="logo">
          <h1>
            <Link href="/">ChatApp</Link>
          </h1>
        </div>
      </Menu.Item>
      <Menu.Item>
        <Button animated="vertical">
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name="add" />
          </Button.Content>
        </Button>
        <Button animated="vertical">
          <Button.Content hidden>Remove</Button.Content>
          <Button.Content visible>
            <Icon name="remove" />
          </Button.Content>
        </Button>
      </Menu.Item>
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
