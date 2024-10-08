import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import Login from './pages/login';
import Header from './components/header';
import Chat from './pages/chat';
import { ChatGuard, LoginGuard, SignupGuard } from './components/guards';
import Signup from './pages/signup';

const App = () => (
  <Provider store={store()}>
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<ChatGuard><Chat /></ChatGuard>} />
        <Route path="login" element={<LoginGuard><Login /></LoginGuard>} />
        <Route path="signup" element={<SignupGuard><Signup /></SignupGuard>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
