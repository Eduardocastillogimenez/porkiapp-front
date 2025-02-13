import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import Register from "./views/Register";
import Dasboards from "./views/dasboards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dasboards" element={<Dasboards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
