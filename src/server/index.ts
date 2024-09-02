import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import ViteExpress from 'vite-express';
import authenticationController from './controllers/authenticationcontroller';
import todoController from './controllers/todocontroller';
import { queryParser } from 'express-query-parser';
import * as dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';

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
app.use('/', todoController, authenticationController);

/**
 * Starting the express server
 */
const server: Server = app.listen(port, () => {
	console.log(`Listening on port number: ${port}`);
});

ViteExpress.bind(app, server);
