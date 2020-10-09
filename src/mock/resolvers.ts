import { getConversations } from "./entities/conversations";
import { getUsers } from "./entities/users";

export const resolvers = {
  Query: {
    conversations() {
      return getConversations();
    },
    conversationBySlug(root, args) {
      const { slug } = args;
      const conversations = getConversations();
      return conversations.find((c) => c.slug === slug);
    },
  },
  Message: {
    author(message, args) {
      const users = getUsers();
      return users.find((u) => u.id === message.authorID);
    },
  },
};
