import slugify from "@sindresorhus/slugify";
import faker from "faker";
import getRange from "get-range";
import randomInt from "random-int";
import randomItem from "random-item";
import randomN from "random-n";
import { ConversationType } from "../../entities/ConversationRecord";
import { createMessages, InMemoryMessageRecord } from "./messages";
import { getUsers, InMemoryUserRecord } from "./users";

let mockConversations = [];

export type InMemoryConversationRecord = {
  id: string;
  type: ConversationType;
  name: string;
  slug: string;
  members: InMemoryUserRecord[];
  messages: InMemoryMessageRecord[];
};

export function getConversations(): InMemoryConversationRecord[] {
  if (mockConversations.length > 0) {
    return mockConversations;
  }

  const count = randomInt(3, 5);
  for (const _ of getRange({ end: count })) {
    createConversation();
  }

  return mockConversations;
}

export function createConversation(): InMemoryConversationRecord {
  const allUsers = getUsers();
  const numUsers = allUsers.length;
  const numMembers = randomInt(Math.min(3, numUsers), numUsers);

  const id = faker.random.uuid();
  const type = randomItem<ConversationType>(["group", "dm"]);
  const name = faker.random.words();
  const slug = slugify(name);
  const members = randomN(allUsers, numMembers);
  const messages = createMessages(id, members);

  const conversation = { id, type, name, slug, members, messages };

  mockConversations.push(conversation);

  return conversation;
}
