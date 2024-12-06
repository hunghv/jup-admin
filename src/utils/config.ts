const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error('Missing environment variables!');
}

export { API_URL };
