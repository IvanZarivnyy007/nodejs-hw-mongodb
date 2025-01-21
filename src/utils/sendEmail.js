import { HttpError } from 'http-errors';
import nodemailer from 'nodemailer';
import { env } from './evn';

const emailObject = nodemailer.createTransport({
  host: env('BREVO_HOST'),
  port: env('BREVO_PORT'),
  auth: {
    user: env('BREVO_USER'),
    pass: env('BREVO_PASS'),
  },
});

export const sendEmail = async (data) => {
  try {
    return emailObject.sendMail(data);
  } catch (error) {
    throw HttpError(500, 'Failed to send the email, please try again later.');
  }
};
