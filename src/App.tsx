import './App.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import { Router } from './routes/sections';
import 'react-toastify/dist/ReactToastify.css';

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
