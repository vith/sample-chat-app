import { gql } from "@apollo/client";
import { ConversationRecord } from "../entities/ConversationRecord";

export const CONVERSATION_METADATA = gql`
  query GetConversation($slug: String!) {
    conversationBySlug(slug: $slug) {
      id
      name
      type
    }
  }
`;

export type ConversationMetadata = {
  conversationBySlug: Partial<ConversationRecord>;
};
