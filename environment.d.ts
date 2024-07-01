declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_MONGO_DB_URL: string;
			NODE_ENV: 'development' | 'production';
		}
	}
}
