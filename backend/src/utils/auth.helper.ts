import bycryt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bycryt.hash(password, 10);
};

export const comparePassword = async (
  hashedPassword: string,
  password: string,
) => {
  return await bycryt.compare(password, hashedPassword);
};
