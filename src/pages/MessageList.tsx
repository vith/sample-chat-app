import React from "react";
import { Feed } from "semantic-ui-react";
import { Message } from "./Message";

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
  return (
    <Feed>
      {messages.map((m) => (
        <Message message={m} />
      ))}
    </Feed>
  );
}
