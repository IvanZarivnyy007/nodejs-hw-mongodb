import cloudinary from 'cloudinary';
import { env } from './evn.js';

cloudinary.v2.config({
  cloud_name: env('CLA_NAME'),
  api_key: env('CLA_KEY'),
  api_secret: env('CLA_SECRET'),
  secure: true,
});

export const saveImage = async (file) => {
  const res = await cloudinary.v2.uploader.upload(file.path);
  return res.secure_url;
};
