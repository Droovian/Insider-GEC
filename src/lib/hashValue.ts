import bcrypt from 'bcrypt';

const hashValue = async (value: string): Promise<string> => {
    const saltRounds = 10; 
    const hashedValue = await bcrypt.hash(value, saltRounds);
    return hashedValue;
};


export { hashValue}