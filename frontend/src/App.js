import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store';
import Login from './pages/login';
import Header from './components/header';
import Index from "./pages";

function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index>main</Index>} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
