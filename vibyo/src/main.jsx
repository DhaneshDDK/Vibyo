import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './Redux/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <BrowserRouter>
       <App />
       <ToastContainer/>
    </BrowserRouter>
 </GoogleOAuthProvider>
 </Provider>,
)
