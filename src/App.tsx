import './App.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import { Router } from './routes/sections';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setNavigateFunction } from './utils/axiosConfig';
import { isTokenExpired } from './pages/authentication/isTokenExpired';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  useEffect(() => {
    const checkToken = async () => {
      const expired = await isTokenExpired();
      if (expired) {
        navigate('/sign-in');
      }
    };
    checkToken();
  }, []);

  return (
    <div>
        <Provider store={store}>
          <Router />
        </Provider>
        <ToastContainer />
    </div>
  );
}

export default App;
