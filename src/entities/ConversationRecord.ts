import { MessageRecord } from "./MessageRecord";
import { UserRecord } from "./UserRecord";

export type ConversationRecord = {
  id: string;
  type: ConversationType;
  name: string;
  slug: string;
  members: UserRecord[];
  messages: MessageRecord[];
};

export type ConversationType = "group" | "dm";
