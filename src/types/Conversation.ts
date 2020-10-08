import { objectType, extendType } from '@nexus/schema';

export const Conversation = objectType({
  name: 'Conversation',
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.UserConversation();
    t.model.Message();
  },
});

export const conversationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.conversation();
    t.crud.conversations();
  },
});

export const conversationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneConversation();
    t.crud.updateOneConversation();
    t.crud.upsertOneConversation();
    t.crud.deleteOneConversation();

    t.crud.updateManyConversation();
    t.crud.deleteManyConversation();
  },
});
