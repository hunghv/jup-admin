export const isTokenExpired = async (): Promise<boolean> => {
  const token = localStorage.getItem('accessToken');
  return checkFirebaseToken(token);
};

function checkFirebaseToken(token: string | null): boolean {
  if (!token) return true;

  try {
    const [, payloadBase64] = token.split('.');

    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    console.error('Token không hợp lệ:', error);
    return true;
  }
}
