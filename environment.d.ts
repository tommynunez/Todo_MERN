declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_MONGO_DB_URL: string;
			NODE_ENV: 'development' | 'production' | 'local';
			NODE_SESSION_SECRET: string;
		}
	}
}
export {};
