import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Feed, Placeholder } from "semantic-ui-react";
import { Message, MessageRecord } from "./Message";

const CONVERSATIONS = gql`
  query GetConversationData($slug: String!) {
    conversationBySlug(slug: $slug) {
      id
      name
      type
      # members
      messages {
        id
        author {
          id
          username
          avatarURL
        }
        content
        timestamp
      }
    }
  }
`;

export type MessageListProps = {
  messages: MessageRecord[];
};

export function MessageList(/* { messages }: MessageListProps */) {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(CONVERSATIONS, {
    variables: {
      slug,
    },
  });

  if (loading) return <Placeholder />;
  if (error)
    return (
      <p>
        Error: <pre>{JSON.stringify(error, undefined, "  ")}</pre>
      </p>
    );

  const { conversationBySlug } = data;
  const { messages } = conversationBySlug;

  return (
    <Feed>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Feed>
  );
}
