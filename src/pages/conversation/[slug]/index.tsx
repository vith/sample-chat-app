import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Placeholder } from "semantic-ui-react";
import { MessageList } from "../../../components/MessageList";

export const CONVERSATION = gql`
  query GetConversation($slug: String!) {
    conversationBySlug(slug: $slug) {
      id
      name
      type
    }
  }
`;

export default function Conversation() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(CONVERSATION, {
    variables: { slug },
  });

  if (loading)
    return (
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    );
  if (error) return <p>Error</p>;

  const conversation = data.conversationBySlug;

  if (!conversation) {
    return <p>No such conversation</p>; // BUG: should be error
  }

  return <MessageList />;
}
