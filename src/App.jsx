import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import Register from "./views/Register";
import Dasboards from "./views/dasboards";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./views/profile";
import Event from "./views/event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboards"
          element={
            // <PrivateRoute>
              <Dasboards />
            // </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/event"
          element={
            <PrivateRoute>
              <Event />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
