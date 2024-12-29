import { User } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const isTokenExpired = async (): Promise<boolean> => {
  const user: User | null = auth.currentUser;

  if (!user) {
    console.warn('No user is logged in.');
    return true; // Nếu không có người dùng đăng nhập, coi như token đã hết hạn.
  }

  try {
    const tokenResult = await user.getIdTokenResult();
    const expirationTime = new Date(tokenResult.expirationTime).getTime();
    const currentTime = new Date().getTime();

    return currentTime >= expirationTime; // Trả về `true` nếu token đã hết hạn.
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Coi như hết hạn nếu có lỗi xảy ra.
  }
};
