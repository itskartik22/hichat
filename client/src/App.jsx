import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import PageNotFound from "./pages/PageNotFound";
import VerifyPassword from "./pages/VerifyPassword";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import Chat from "./components/app/Chat";
import Status from "./components/app/Status";
import Contacts from "./components/app/Contact";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to={"chat"} />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="status" element={<Status />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to={"login"} />} />
            <Route path="login" element={<Login />} />
            <Route path="verify" element={<VerifyPassword />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
