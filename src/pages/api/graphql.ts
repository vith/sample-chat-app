import { ApolloServer } from "apollo-server-micro";
import { readFileSync } from "fs";
import path from "path";
import pkgDir from "pkg-dir";
import { resolvers } from "../../mock/resolvers";

const schemaPath = path.join(pkgDir.sync(), "src", "schema.graphql");

const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });

const apollo = new ApolloServer({ typeDefs, resolvers });

export default apollo.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
