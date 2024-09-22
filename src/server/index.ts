import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import ViteExpress from 'vite-express';
import authenticationController from './routes/authenticationRoute';
import todoController from './routes/todoRoute';
import { queryParser } from 'express-query-parser';
import * as dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';

const app: Express = express();
const port: number = 3001;

/**
 * Configure where to pull in the environment based
 * configuratons, the environment is set in package.json
 * within the script command
 */
dotenv.config({
	path: path.resolve(
		process.cwd(),
		process.env.NODE_ENV === 'development'
			? '.env.development.local'
			: '.env.production.local'
	),
});

app.use(
	queryParser({
		parseNull: true,
		parseUndefined: true,
		parseBoolean: true,
		parseNumber: true,
	})
);
app.use(bodyParser.json());

app.use(helmet());

const mongoString = 'mongo connection string';
mongoose.connect(mongoString);
const db = mongoose.connection;

app.use(
	session({
		secret: process.env.NODE_SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({
			mongoUrl: db.getClient().options.metadata.env?.url,
		}),
	})
);

app.use(passport.authenticate('session'));

/**
 * Health check api
 */
app.get('/health', (_request: Request, _response: Response) => {
	_response.sendStatus(200);
});

/**
 * Authentication controller entry using express router
 */
app.use('/', authenticationController);

/**
 * Todo controller entrypoint using express router
 */
app.use('/', todoController);

/**
 * Starting the express server
 */
const server: Server = app.listen(port, () => {
	console.log(`Listening on port number: ${port}`);
});

ViteExpress.bind(app, server);
