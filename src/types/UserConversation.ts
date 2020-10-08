import { objectType, extendType } from '@nexus/schema';

export const UserConversation = objectType({
  name: 'UserConversation',
  definition(t) {
    t.model.userid();
    t.model.conversationid();
    t.model.Conversation();
    t.model.User();
  },
});

export const userConversationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userConversation();
    t.crud.userConversations();
  },
});

export const userConversationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserConversation();
    t.crud.updateOneUserConversation();
    t.crud.upsertOneUserConversation();
    t.crud.deleteOneUserConversation();

    t.crud.updateManyUserConversation();
    t.crud.deleteManyUserConversation();
  },
});
