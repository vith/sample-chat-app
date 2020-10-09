import faker from "faker";
import getRange from "get-range";
import randomInt from "random-int";
import randomItem from "random-item";
import { InMemoryUserRecord } from "./users";

let mockMessages = [];
let lastTimestamp = Date.now() - 7 * 24 * 3600 * 1000;

export type InMemoryMessageRecord = {
  id: string;
  authorID: string;
  conversationID: string;
  content: string;
  timestamp: number;
};

export function createMessages(
  conversationID,
  members
): InMemoryMessageRecord[] {
  const count = randomInt(50, 100);

  let messages = [];
  for (const _ of getRange({ end: count })) {
    messages.push(createMessage(conversationID, members));
  }

  return messages;
}

function createMessage(conversationID, members): InMemoryMessageRecord {
  const id = faker.random.uuid();
  const authorID = randomItem<InMemoryUserRecord>(members).id;
  const content = faker.lorem.sentences(randomInt(1, 3));
  const timestamp = randomInt(lastTimestamp, lastTimestamp + 1000 * 5 * 60);

  // TODO: change type in GraphQL; we're over the 32bit limit for Int
  const message = {
    id,
    authorID,
    conversationID,
    content,
    timestamp: Math.round(timestamp / 1000),
  };

  lastTimestamp = timestamp;

  mockMessages.push(message);

  return message;
}
