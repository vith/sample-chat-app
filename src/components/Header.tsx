import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Header, Loader } from "semantic-ui-react";
import {
  ConversationMetadata,
  CONVERSATION_METADATA,
} from "../queries/CONVERSATION_METADATA";

export function ConversationHeader() {
  return <Header as="h2">{getHeaderText()}</Header>;
}

function getHeaderText() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery<ConversationMetadata>(
    CONVERSATION_METADATA,
    {
      variables: { slug },
      skip: !slug,
    }
  );

  if (loading) return <Loader />;
  if (error) return;
  if (!data) return;

  const conversation = data.conversationBySlug;

  if (!conversation) return;

  return conversation.name;
}
