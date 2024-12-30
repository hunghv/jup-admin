import { getLocalStorage } from '../../common/localStorageHelper';

const jwt = require('jsonwebtoken');

export const isTokenExpired = async (): Promise<boolean> => {
  const token = getLocalStorage('accessToken');
  console.log(token);
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) {
    throw new Error('Invalid token structure');
  }
  console.log(decoded);
  const currentTime = Math.floor(Date.now() / 1000); 
  console.log(currentTime);
  try {
    return currentTime >= decoded.exp;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};
