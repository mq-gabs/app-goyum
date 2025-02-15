import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import PrivateHome from "../pages/private/PrivateHome";
import Products from "../pages/private/Products";
import Menu from "../components/private/Menu";
import MobileMenu from "../components/private/MobileMenu";
import NewProduct from "../pages/private/NewProduct";
import Orders from "../pages/private/Orders";
import ViewOrder from "../pages/private/VIewOrder";

export default function PrivateRouter() {
  return (
    <div className="flex">
      <div className="hidden sm:block w-[300px] h-screen border-r">
        <Menu />
      </div>
      <div className="block sm:hidden">
        <MobileMenu />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/novo" element={<NewProduct />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/pedidos/:id" element={<ViewOrder />} />
          <Route path="/" element={<PrivateHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
