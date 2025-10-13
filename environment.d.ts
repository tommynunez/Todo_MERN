declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_MONGO_DB_URL: string;
			NODE_ENV: 'development' | 'production' | 'local';
			NODE_SESSION_SECRET: string;
			NODE_INVITE_JWT_SECRET: string;
			NODE_INVITE_JWT_EXPIRES_IN: string;
			NODE_USE_CSP?: true | false;
		}
	}
}
export {};
