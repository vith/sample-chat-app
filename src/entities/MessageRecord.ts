import { UserRecord } from "./UserRecord";

export type MessageRecord = {
  id: string;
  author: UserRecord;
  content: string;
  timestamp: number;
};
