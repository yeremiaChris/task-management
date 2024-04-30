import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Platform } from "./pages/home/platform";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Platform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
