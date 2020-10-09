import { gql } from "@apollo/client";
import { ConversationRecord } from "../entities/ConversationRecord";

export const CONVERSATION_LIST = gql`
  query GetConversationList {
    conversations {
      id
      name
      slug
      type
    }
  }
`;

export type ConversationList = {
  conversations: Array<Partial<ConversationRecord>>;
};
