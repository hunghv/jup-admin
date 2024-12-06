import './App.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import { Router } from './routes/sections';

function App() {
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
