import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PublicHome from "../pages/PublicHome";
import MakeOrder from "../pages/MakeOrder";
import MyOrder from "../pages/MyOrder";

export default function PublicRouter() {
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route path="/p/:id" element={<MakeOrder />} />
      <Route path="/pedido/:id" element={<MyOrder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
