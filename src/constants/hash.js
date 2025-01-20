import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};
