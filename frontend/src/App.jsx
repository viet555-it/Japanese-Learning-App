import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/Home";
import Kana from "./pages/Kana";
import Vocab from "./pages/Vocab";
import Kanji from "./pages/Kanji";
import ProgressPage from './pages/Progress/index.jsx';
import LoginPage from "./pages/Authentication/LoginPage";
import SignUpPage from "./pages/Authentication/SignUpPage";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuth = location.pathname === "/login" || location.pathname === "/register";

  if (isHome) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    );
  }

  if (isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/kana" element={<Kana />} />
        <Route path="/vocab" element={<Vocab />} />
        <Route path="/kanji" element={<Kanji />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;