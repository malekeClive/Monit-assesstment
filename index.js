const express = require("express");
const cors = require("cors");
const resolvers = require("./resolvers");
const { default: gql } = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { expressMiddleware } = require("@apollo/server/express4");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

const typeDefs = gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
);

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

startApolloServer();
