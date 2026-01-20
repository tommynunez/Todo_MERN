/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_MONGO_DB_URL: string;
  readonly NODE_SESSION_SECRET: string;
  readonly NODE_INVITE_JWT_SECRET: string;
  readonly NODE_USER_JWT_SECRET: string;
  readonly NODE_INVITE_JWT_EXPIRES_IN: string;
  readonly NODE_MAILEROO_INVITE_EMAIL_TEMPLATE_ID: string;
  readonly NODE_MAILEROO_REGISTRATION_INVITE_EMAIL_TEMPLATE_ID: string;
  readonly NODE_MAILEROO_CONFIRM_EMAIL_TEMPLATE_ID: string;
  readonly NODE_MAILEROO_FORGOT_PASSWORD_EMAIL_TEMPLATE_ID: string;
  readonly NODE_MAILEROO_ACCOUNT_LOCKED_EMAIL_TEMPLATE_ID: string;
  readonly NODE_MAILEROO_WELCOME_EMAIL_TEMPLATE_ID: string;
  readonly NODE_MAILEROO_API_KEY: string;
  readonly NODE_MAILEROO_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
