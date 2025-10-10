import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import authenticationController from './routes/authenticationRoute';
import todoController from './routes/todoRoute';
import { queryParser } from 'express-query-parser';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { configurePassport } from './config/passport';
import { loadEnv } from './config/environment';
import attachClient from './config/attachClient';
import { authenticatedMiddleware } from './middleware/authenticatedMiddleware';

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
const isProd = process.env.NODE_ENV === 'production';
const devClientOrigin = process.env.NODE_APP_URL ?? 'http://localhost:3000';

const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: isProd ? ["'self'"] : ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
  connectSrc: isProd ? ["'self'"] : ["'self'", "ws:", "wss:"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: isProd ? ["'self'", "data:", "blob:"] : ["'self'", "data:", "blob:", devClientOrigin],
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

app.use(
	session({
		secret: process.env.NODE_SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 36000, httpOnly: true },
		store: new MongoStore({
			mongoUrl: process.env.NODE_MONGO_DB_URL,
		}),
	})
);

configurePassport({ app, passportInstance: passport });

/**
 * Health check api
 */
app.get('/health', (_request: Request, _response: Response) => {
	_response.sendStatus(200);
});

/**
 * Authentication controller entry using express router
 */
app.use('/api/authentication', authenticationController);

/**
 * Todo controller entrypoint using express router
 */
app.use('/api/todos', authenticatedMiddleware, todoController);

/**
 * Starting the express server
 */
const server: Server = app.listen(port, () => {
	console.log(`Listening on port number: ${port}`);
});

attachClient(app, server, {
	clientRoot: path.resolve(process.cwd()),
	clientDist: path.resolve(process.cwd(), 'client', 'dist'),
});