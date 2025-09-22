import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/routeProtection";
import Index from "./pages.tsx";
import Users from "./pages.tsx/users.tsx";
import Login from "./pages.tsx/login.tsx";
import Files from "./pages.tsx/files.tsx";

function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/files" element={<Files />} />
        </Routes>
      </ProtectedRoute>

    </BrowserRouter>
  );
}

export default App;
