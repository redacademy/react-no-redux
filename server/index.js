import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressJWT from "express-jwt";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlExpress } from "apollo-server-express";

/**
 *
 * GraphQL
 *
 */
const typeDefs = `
  type HelloMessage {
      message: String
  }

  type WorldMessage {
    message: String
  }

  type Query {
      hello: HelloMessage,
      world: WorldMessage
  }
`;

const resolvers = {
  Query: {
    hello: () => ({
      message: "Hello World."
    }),
    world: () => ({
      message: "World."
    })
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/**
 *
 * Authentication
 *
 */

const APP_SECRET = "SECRET!";

/**
 *
 * Express Server
 *
 */

const PORT = 3001;
const app = express();
app.listen(PORT);

/**
 *
 * Server Middleware & Routes
 *
 */

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan(":method :url :status :response-time ms"));
app.use(bodyParser.json());
app.user(cookieParser());

app.use("/graphql", [
  expressJWT({
    secret: APP_SECRET,
    getToken: req => {
      console.log(req.headers);
      return null;
    }
  }),
  graphqlExpress(req => ({ schema, context: { user: req.user } }))
]);

app.post("/login", function(req, res) {
  if (req.body.username === "admin" && req.body.password === "admin") {
    res
      .cookie(
        "bt-token",
        jwt.sign({ userId: 1 }, APP_SECRET, { expiresIn: 60 * 60 }),
        { maxAge: 60 * 60, httpOnly: true }
      )
      .send();
  } else {
    res.status(401).json({
      error: {
        message: "Authentication failed!"
      }
    });
  }
});
