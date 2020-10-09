import faker from "faker";
import getRange from "get-range";
import randomInt from "random-int";

let mockUsers = [];

export type InMemoryUserRecord = {
  id: string;
  username: string;
  avatarURL: string;
};

export function getUsers(): InMemoryUserRecord[] {
  if (mockUsers.length > 0) {
    return mockUsers;
  }

  const count = randomInt(5, 10);
  for (const _ of getRange({ end: count })) {
    mockUsers.push(createUser());
  }

  return mockUsers;
}

export function createUser(): InMemoryUserRecord {
  const id = faker.random.uuid();
  const username = faker.internet.userName();
  const avatarURL = faker.internet.avatar();

  return { id, username, avatarURL };
}
