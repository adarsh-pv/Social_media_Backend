import bcrypt from "bcrypt";

export const hashpassword = async (data: string) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  } catch (error) {
    return;
  }
};
export const comparepass = async (password: string, comparigpass: string) => {
  try {
    const valid = await bcrypt.compare(comparigpass, password);
    if (valid) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
