import { objectType, extendType } from '@nexus/schema';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id();
    t.model.author();
    t.model.conversation();
    t.model.content();
    t.model.timestamp();
    t.model.User();
    t.model.Conversation();
  },
});

export const messageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.message();
    t.crud.messages();
  },
});

export const messageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMessage();
    t.crud.updateOneMessage();
    t.crud.upsertOneMessage();
    t.crud.deleteOneMessage();

    t.crud.updateManyMessage();
    t.crud.deleteManyMessage();
  },
});
