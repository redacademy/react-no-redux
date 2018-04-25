import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlExpress } from "apollo-server-express";

const typeDefs = `
    type HelloMessage {
        message: String
    }

  type Query {
      hello: HelloMessage
  }
`;

const resolvers = {
  Query: {
    hello: () => ({
      message: "Hello World."
    })
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3001;
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.listen(PORT);
