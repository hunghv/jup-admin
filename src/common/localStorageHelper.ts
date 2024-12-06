// Đảm bảo các key mà bạn sử dụng trong localStorage được khai báo rõ ràng

const STORAGE_KEY = 'UserInformation'; // Bạn có thể thay đổi key này tùy theo nhu cầu

export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value)); // Lưu trữ vào localStorage
  } catch (error) {
    console.error('Error setting data in localStorage', error);
  }
};

export const getUserInformation = (): any | null => {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null; // Parse dữ liệu ra và trả về
  } catch (error) {
    console.error('Error getting data from localStorage', error);
    return null;
  }
};

export const getLocalStorage = (key: string): any | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse dữ liệu ra và trả về
  } catch (error) {
    console.error('Error getting data from localStorage', error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key); // Xóa item khỏi localStorage
  } catch (error) {
    console.error('Error removing data from localStorage', error);
  }
};
