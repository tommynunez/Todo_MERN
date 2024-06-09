import mongoose from "mongoose";
import { insertDocumentAsync } from "./documents/todo/index";
const uri = "mongodb://localhost:27017";

export class Database {
	databaseName: string = "";
	constructor() {}

	createDatabase = async () => {
		try {
			await mongoose.connect(uri);
			insertDocumentAsync({ name: "test" });
		} catch (error) {
			console.log(
				`createDatabase::There was an issue creating database ${this.databaseName}.  Error message ${error}`
			);
		} finally {
			console.log("r1");
		}
	};

	openConnection = async () => {
		try {
			await mongoose.connect(uri);
		} catch (error) {
			console.log(
				`openConnection::There was an issue connecting to database ${this.databaseName}.  Error message ${error}`
			);
		}
	};

	closeConnection = async () => {
		try {
			await mongoose.disconnect();
		} catch (error) {
			console.log(
				`closeConnection::There was an issue disconnecting to database ${this.databaseName}.  Error message ${error}`
			);
		}
	};
}

const db = new Database();
await db.createDatabase();
process.exit(0);
