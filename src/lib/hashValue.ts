import bcrypt from 'bcrypt';

const hashValue = async (value: string): Promise<string> => {
  const saltRounds = 10; // Adjust based on security needs
  const hashedValue = await bcrypt.hash(value, saltRounds);
  return hashedValue;
};


export { hashValue}