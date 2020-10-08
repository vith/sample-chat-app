import React from "react";
import { Feed } from "semantic-ui-react";
import { Message, MessageRecord } from "./Message";

export type MessageListProps = {
  messages: MessageRecord[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <Feed>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Feed>
  );
}
