import {
  asNexusMethod,
  makeSchema,
  mutationType,
  objectType,
  queryType,
} from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import path from "path";

const prisma = new PrismaClient();

const apollo = new ApolloServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    typegenAutoConfig: {
      contextType: "{ prisma: PrismaClient.PrismaClient }",
      sources: [{ source: ".prisma/client", alias: "PrismaClient" }],
    },
    outputs: {
      typegen: path.join(
        process.cwd(),
        "node_modules/@types/nexus-typegen/index.d.ts"
      ),
      schema: path.join(process.cwd(), "./api.graphql"),
    },
    plugins: [
      nexusSchemaPrisma({
        experimentalCRUD: true,
      }),
    ],
    types: [
      asNexusMethod(JSONObjectResolver, "json"),
      asNexusMethod(DateTimeResolver, "date"),
      queryType({
        definition(t) {
          t.crud.user();
          t.crud.users({ ordering: true });
          //   t.crud.conversation();
          //   t.crud.conversations({ filtering: true });
        },
      }),
      mutationType({
        definition(t) {
          t.crud.createOneUser();
          //   t.crud.createOnePost();
          t.crud.deleteOneUser();
          //   t.crud.deleteOnePost();
        },
      }),
      objectType({
        name: "User",
        definition(t) {
          t.model.id();
          t.model.username();
          t.model.avatarURL();
          //   t.model.UserConversation();
          //   t.model.posts();
        },
      }),
      objectType({
        name: "Conversation",
        definition(t) {
          t.model.id();
          t.model.type();
          //   t.model.Message();
        },
      }),
    ],
  }),
});

// const schema = makeSchema({
//   types,
//   plugins: [nexusSchemaPrisma()],
// });

export default apollo.createHandler({
  path: "/api/nexus",
});
