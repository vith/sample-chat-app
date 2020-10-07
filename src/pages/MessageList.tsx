import React from "react";
import { Feed, Icon } from "semantic-ui-react";

export type Message = {
  avatarUrl: string;
  username: string;
  timestamp: Date;
  content: string;
};

export type MessageListProps = {
  messages: Message[];
};

export function MessageList({ messages }: MessageListProps) {
  //   return <pre>{JSON.stringify(messages)}</pre>;
  const messageComponents = messages.map((m) => (
    <Feed.Event>
      <Feed.Label image={m.avatarUrl} />
      <Feed.Content>
        <Feed.Summary>
          {m.username}
          <Feed.Date>{m.timestamp.toLocaleString()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>{m.content}</Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" />5 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  ));

  return <Feed>{messageComponents}</Feed>;
}
