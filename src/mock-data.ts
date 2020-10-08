import slugify from "@sindresorhus/slugify";
import faker from "faker";
import getRange from "get-range";
import randomInt from "random-int";
import randomItem from "random-item";
import randomN from "random-n";

export type User = {
  id: string;
  username: string;
  avatarURL: string;
};

export type ConversationRecord = {
  id: string;
  type: "group" | "dm";
  name: string;
  slug: string;
  members: User[];
  messages: MessageRecord[];
};

export type MessageRecord = {
  id: string;
  authorID: string;
  conversationID: string;
  content: string;
  timestamp: number;
};

export function createUser(): User {
  const id = faker.random.uuid();
  const username = faker.internet.userName();
  const avatarURL = faker.internet.avatar();

  return { id, username, avatarURL };
}

let mockUsers;

export function getUsers() {
  if (mockUsers) {
    return mockUsers;
  }

  const count = randomInt(5, 10);
  const users = [];
  for (const _ of getRange({ end: count })) {
    users.push(createUser());
  }

  return (mockUsers = users);
}

let mockConversations = [];

export function getConversations() {
  if (mockConversations.length > 0) {
    return mockConversations;
  }

  const count = randomInt(3, 5);
  for (const _ of getRange({ end: count })) {
    createConversation();
  }

  return mockConversations;
}

export function createConversation(): ConversationRecord {
  const allUsers = getUsers();
  const numUsers = allUsers.length;
  const numMembers = randomInt(Math.min(3, numUsers), numUsers);

  const id = faker.random.uuid();
  const type = randomItem(["group", "dm"]);
  const name = faker.random.words();
  const slug = slugify(name);
  const members = randomN(allUsers, numMembers);
  const messages = createMessages(id, members);

  const conversation = { id, type, name, slug, members, messages };

  mockConversations.push(conversation);
  // @ts-expect-error
  return conversation;
}

function createMessages(conversationID, members) {
  const count = randomInt(50, 100);

  let messages = [];
  for (const _ of getRange({ end: count })) {
    messages.push(createMessage(conversationID, members));
  }

  return messages;
}

let mockMessages = [];
let lastTimestamp = Date.now() - 7 * 24 * 3600 * 1000;

function createMessage(conversationID, members): MessageRecord {
  const id = faker.random.uuid();
  const authorID = randomItem(members).id;
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

export const resolvers = {
  Query: {
    conversations() {
      return getConversations();
    },
    conversationBySlug(root, args) {
      const { slug } = args;
      return mockConversations.find((c) => c.slug === slug);
    },
  },
  Message: {
    author(message, args) {
      return mockUsers.find((u) => u.id === message.authorID);
    },
  },
};
