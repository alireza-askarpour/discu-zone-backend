import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Server config
  APP_ID: Joi.string().uuid({ version: 'uuidv4' }).required(),
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  DOMAIN: Joi.string().required(),
  URL: Joi.string().uri().required(),
  REST_DOCUMENT_ROUTE: Joi.string().required(),
  SOCKET_DOCUMENT_ROUTE: Joi.string().required(),

  // Database config
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_DIALECT: Joi.string().required(),
  DB_NAME_TEST: Joi.string().optional(),
  DB_NAME_DEVELOPMENT: Joi.string().optional(),
  DB_NAME_PRODUCTION: Joi.string().optional(),

  // JWT config
  JWT_ACCESS_TIME: Joi.number().required(),
  JWT_CONFIRMATION_SECRET: Joi.string().required(),
  JWT_CONFIRMATION_TIME: Joi.number().required(),
  JWT_RESET_PASSWORD_SECRET: Joi.string().required(),
  JWT_RESET_PASSWORD_TIME: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_TIME: Joi.number().required(),

  // Refresh token
  REFRESH_COOKIE: Joi.string().required(),
  ACCESS_COOKIE: Joi.string().required(),
  COOKIE_SECRET: Joi.string().required(),

  // Email config
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_SECURE: Joi.bool().required(),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().required(),

  // OAuth config
  GOOGLE_CLIENT_ID: Joi.string().optional(),
  GOOGLE_CLIENT_SECRET: Joi.string().optional(),
  DISCORD_CLIENT_ID: Joi.string().optional(),
  DISCORD_CLIENT_SECRET: Joi.string().optional(),
  GITHUB_CLIENT_ID: Joi.string().optional(),
  GITHUB_CLIENT_SECRET: Joi.string().optional(),
  CLIENT_REDIRECT_URL: Joi.string().optional(),
});
