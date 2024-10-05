import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store';
import Login from './pages/login';
import Header from './components/header';
import Chat from "./pages/chat";
import { ChatGuard, LoginGuard } from "./components/guards";

function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ChatGuard><Chat /></ChatGuard>} />
          <Route path="login" element={<LoginGuard><Login /></LoginGuard>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
