import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Kana from "./pages/Kana";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kana" element={<Kana />} />
    </Routes>
  );
}

export default App;