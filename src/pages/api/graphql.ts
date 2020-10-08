import { makeSchema } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import path from "path";
import { User, userMutation, userQuery } from "../../types";
// or const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const schema = makeSchema({
  types: [User, userQuery, userMutation],
  outputs: {
    typegen: path.join(process.cwd(), "pages", "api", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "pages", "api", "schema.graphql"),
  },
});

// export default async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.statusCode = 200;
//   res.json(users);
// };

export default new ApolloServer({ schema }).createHandler({
  path: "/api",
});
