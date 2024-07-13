import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import ViteExpress from 'vite-express';
import todoController from './controllers/todocontroller';
import { queryParser } from 'express-query-parser';
import * as dotenv from 'dotenv';
import path from 'path';

const app: Express = express();
const port: number = 3001;

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

/**
 * Health check api
 */
app.get('/health', (_request: Request, _response: Response) => {
	_response.sendStatus(200);
});

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
