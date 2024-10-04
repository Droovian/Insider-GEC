export function generateRandomUsername() {
    const prefix = 'gec'; 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomLength = 6; 
    let randomPart = '';
  
    for (let i = 0; i < randomLength; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return `${prefix}${randomPart}`;
  }