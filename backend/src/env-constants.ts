import * as dotenv from "dotenv";
dotenv.config();

export const constants = {
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,

  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,
  SENDGRID_TEMPLATE_ID: process.env.SENDGRID_TEMPLATE_ID,
  CLIENT_URL: process.env.CLIENT_URL,
  LOGO_URL: process.env.LOGO_URL,
  EMAIL_PHOTO: process.env.EMAIL_PHOTO,

  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
  SUPER_ADMIN_PHONE: process.env.SUPER_ADMIN_PHONE,
  SUPER_ADMIN_FIRST_NAME: process.env.SUPER_ADMIN_FIRST_NAME,
  SUPER_ADMIN_LAST_NAME: process.env.SUPER_ADMIN_LAST_NAME,

  bcryptSalt: process.env.BCRYPT_SALT,
};
