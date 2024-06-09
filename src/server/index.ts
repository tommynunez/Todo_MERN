import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { Server } from "http";
import ViteExpress from "vite-express";
import todoController from "./controllers/todocontroller";
import { queryParser } from "express-query-parser";

const app: Express = express();
const port: number = 3001;

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
app.get("/health", (_request: Request, _response: Response) => {
	_response.sendStatus(200);
});

/**
 * Todo controller entrypoint using express router
 */
app.use("/", todoController);

/**
 * Starting the express server
 */
const server: Server = app.listen(port, () => {
	console.log(`Listening on port number: ${port}`);
});

ViteExpress.bind(app, server);
