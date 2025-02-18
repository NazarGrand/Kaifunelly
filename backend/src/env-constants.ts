import * as dotenv from "dotenv";
dotenv.config();

export const DB_PORT = process.env.DB_PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL;
export const SENDGRID_TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;
export const CLIENT_URL = process.env.CLIENT_URL;
export const LOGO_URL = process.env.LOGO_URL;
export const EMAIL_PHOTO = process.env.EMAIL_PHOTO;
