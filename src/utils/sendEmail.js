import { HttpError } from 'http-errors';
import nodemailer from 'nodemailer';
import { env } from './evn.js';

const emailObject = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: env('SMTP_PORT'),
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASS'),
  },
});

export const sendEmail = async (data) => {
  try {
    return emailObject.sendMail(data);
  } catch (error) {
    throw HttpError(500, 'Failed to send the email, please try again later.');
  }
};
