import { Menu, Sidebar } from "semantic-ui-react";

type AppSidebarProps = {
  channels: string[];
  directMessages: string[];
};

export default function AppSidebar({
  channels,
  directMessages,
}: AppSidebarProps) {
  const channelComponents = channels.map((c) => (
    <Menu.Item key={c}>{c}</Menu.Item>
  ));

  const dmComponents = directMessages.map((dm) => (
    <Menu.Item key={dm}>{dm}</Menu.Item>
  ));

  return (
    <>
      <p>hi</p>
      <Sidebar as={Menu} visible vertical>
        <Menu.Item>
          <Menu.Header>Channels</Menu.Header>
          <Menu.Menu>{channelComponents}</Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Direct Messages</Menu.Header>
          <Menu.Menu>{dmComponents}</Menu.Menu>
        </Menu.Item>
      </Sidebar>
    </>
  );
}
