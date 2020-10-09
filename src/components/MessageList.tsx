import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Feed, Placeholder } from "semantic-ui-react";
import {
  ConversationData,
  CONVERSATION_DATA,
} from "../queries/CONVERSATION_DATA";
import { Message } from "./Message";

export function MessageList() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery<ConversationData>(
    CONVERSATION_DATA,
    {
      variables: {
        slug,
      },
    }
  );

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
