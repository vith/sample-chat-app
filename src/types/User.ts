import { extendType, objectType } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("username");
    t.string("avatarURL");
    t.list.field("conversations", {
      type: "UserConversation",
      resolve: (parent) =>
        prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .UserConversation(),
    });
  },
});

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});

export const userMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.upsertOneUser();
    t.crud.deleteOneUser();

    t.crud.updateManyUser();
    t.crud.deleteManyUser();
  },
});
