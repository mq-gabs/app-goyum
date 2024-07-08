import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export default function PublicRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
