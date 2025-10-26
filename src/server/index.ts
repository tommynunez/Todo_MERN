import express, { Express, Request, Response } from "express";
import { Server } from "http";
import { createAuthenticationroutes } from "./routes/authenticationRoute";
import { createTodoroutes } from "./routes/todoRoute";
import { createChorelistRoutes } from "./routes/chorelistRoute";
import { queryParser } from "express-query-parser";
import path from "path";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import { configurePassport } from "./config/passport";
import { loadEnv } from "./config/environment";
import attachClient from "./config/attachClient";
import { authenticatedMiddleware } from "./middleware/authenticatedMiddleware";
import { closeConnection, openConnection } from "./config/databaseClient";
import ChoreListService from "./services/choreListService";
import { ChoreRepository } from "./repositories/choreListRepository";
import TodoService from "./services/todoService";
import { TodoRepository } from "./repositories/todoRepository";
import UserService from "./services/userService";
import { UserRepository } from "./repositories/userRepository";
import { InviteService } from "./services/inviteService";
import { InviteRepository } from "./repositories/inviteRepository";
import { createInviteRoutes } from "./routes/inviteRoute";

const app: Express = express();
const port: number = 3000;

loadEnv();

app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add Content-Security-Policy (allow same-origin images and dev HMR resources)
const isProd = process.env.NODE_ENV === "production";
const devClientOrigin = process.env.NODE_APP_URL ?? "http://localhost:3000";

const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: isProd
    ? ["'self'"]
    : ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
  connectSrc: isProd ? ["'self'"] : ["'self'", "ws:", "wss:"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: isProd
    ? ["'self'", "data:", "blob:"]
    : ["'self'", "data:", "blob:", devClientOrigin],
  fontSrc: ["'self'", "data:"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  frameAncestors: ["'none'"],
};

app.use(helmet());
app.use(helmet.contentSecurityPolicy({ directives: cspDirectives }));

const mongoString = process.env.NODE_MONGO_DB_URL;
mongoose.connect(mongoString);

app.use(cookieParser());

/**
 * Session middleware configuration
 * The session secret should be a long random string
 * In production, the secret should be stored in an environment variable
 */
app.use(
  session({
    secret: process.env.NODE_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 36000,
      httpOnly: true,
    },
    store: new MongoStore({
      mongoUrl: process.env.NODE_MONGO_DB_URL,
    }),
  })
);

configurePassport({ app, passportInstance: passport });

await openConnection();

/**
 * Health check api
 */
app.get("/health", (_request: Request, _response: Response) => {
  _response.sendStatus(200);
});

/**
 * Authentication controller entry using express router
 */
app.use(
  "/api/authentication",
  createAuthenticationroutes(new UserService(new UserRepository()))
);

/**k
 * Todo controller entrypoint using express router
 */
app.use(
  "/api/todos",
  authenticatedMiddleware,
  createTodoroutes(
    new TodoService(
      new TodoRepository(),
      new ChoreListService(new ChoreRepository())
    )
  )
);

/**
 * Chorelist controller entrypoint using express router
 */
app.use(
  "/api/chorelists",
  authenticatedMiddleware,
  createChorelistRoutes(new ChoreListService(new ChoreRepository()))
);

app.use(
  "/api/invite",
  authenticatedMiddleware,
  createInviteRoutes(
    new InviteService(
      new ChoreListService(new ChoreRepository()),
      new UserService(new UserRepository()),
      new InviteRepository()
    )
  )
);

/**
 * Starting the express server
 */
const server: Server = app.listen(port, () => {
  console.log(`Listening on port number: ${port}`);
});

/**
 * Attach client application (React) to the express server
 * Make sure to run the client build process to generate the static files
 * in the client/dist folder
 * You can run the client in dev mode using Vite with HMR support
 * by running `npm run dev` in the client folder
 * Make sure to set the NODE_APP_URL environment variable to the
 * client dev server url (e.g. http://localhost:3000)
 * The client will be served from the root path (/)
 * The api endpoints will be served from /api/*
 * This setup allows to have a single server for both
 * the client and the api
 *
 * In production, the client will be served as static files
 * from the client/dist folder
 *
 * In development, the client will be served by the Vite dev server
 * with HMR support
 * The clientRoot is the root folder of the client application
 * The clientDist is the folder where the static files are generated
 * by the client build process
 * The attachClient function takes care of the rest
 */
attachClient(app, server, {
  clientRoot: path.resolve(process.cwd()),
  clientDist: path.resolve(process.cwd(), "client", "dist"),
});

await closeConnection(server);
