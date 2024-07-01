/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly NODE_MONGO_DB_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
