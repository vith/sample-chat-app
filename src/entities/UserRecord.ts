import { ConversationRecord } from "./ConversationRecord";

export type UserRecord = {
  id: string;
  username: string;
  avatarURL: string;
  conversations: ConversationRecord[];
};
