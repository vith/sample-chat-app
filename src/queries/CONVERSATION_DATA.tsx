import { gql } from "@apollo/client";
import { ConversationRecord } from "../entities/ConversationRecord";

export const CONVERSATION_DATA = gql`
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

export type ConversationData = {
  conversationBySlug: Partial<ConversationRecord>;
};
