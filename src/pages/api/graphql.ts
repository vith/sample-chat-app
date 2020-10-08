import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addMocksToSchema } from "@graphql-tools/mock";
import { ApolloServer } from "apollo-server-micro";
import { readFileSync } from "fs";
import path from "path";
import pkgDir from "pkg-dir";
import {
  createConversation,
  createUser,
  getConversations,
  resolvers,
} from "../../mock-data";

const schemaPath = path.join(pkgDir.sync(), "src", "schema.graphql");
const schema = loadSchemaSync(schemaPath, {
  // load from a single schema file
  loaders: [new GraphQLFileLoader()],
});

const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });

// const mockUsers = getUsers();
// const mockConversations = createConversation();

const mocks = {
  User: () => createUser(),
  Conversation: () => createConversation(),
  conversations: () => getConversations(),
};

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
});

// const apollo = new ApolloServer({ schema: schemaWithMocks });
const apollo = new ApolloServer({ typeDefs, resolvers });
const handler = apollo.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
// http://localhost:3000/api/graphql
