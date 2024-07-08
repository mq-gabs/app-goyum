import { BrowserRouter } from "react-router-dom";
import { useStore } from "../hooks/user";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

export default function AppRouter() {
  const { data } = useStore();

  console.log({ data });

  return (
    <BrowserRouter>
      {data?.token ? <PrivateRouter /> : <PublicRouter />}
    </BrowserRouter>
  );
}
