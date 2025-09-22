import { BrowserRouter, Route } from "react-router-dom";
import ProtectedRoute from "./utils/routeProtection";

function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <Route path="/home" element={<></>} />
        <Route path="/about" element={<></>} />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
