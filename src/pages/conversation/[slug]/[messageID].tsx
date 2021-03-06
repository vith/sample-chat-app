import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Loader } from "semantic-ui-react";
import { MessageList } from "../../../components/MessageList";
import {
  ConversationMetadata,
  CONVERSATION_METADATA,
} from "../../../queries/CONVERSATION_METADATA";

export default function Conversation() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery<ConversationMetadata>(
    CONVERSATION_METADATA,
    {
      variables: { slug },
    }
  );

  if (loading) return <Loader />;

  if (error) return <p>Error</p>;

  const conversation = data.conversationBySlug;

  if (!conversation) {
    return <p>No such conversation</p>; // BUG: should be error
  }

  return <MessageList />;
}
