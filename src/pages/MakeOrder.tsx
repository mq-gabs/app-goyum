import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApi } from "../hooks/api";
import { TProduct } from "../utils/type";

export default function MakeOrder() {
  const [fetch, loading] = useApi();

  const [products, setProducts] = useState<TProduct[]>([]);

  const getDataByNick = async () => {
    const id = window.location.pathname.split("/")[2];

    if (!id) {
      toast("Nick não encontrado!", { type: "error" });
      return;
    }

    const response = await fetch({
      path: `products/${id}`,
    });

    if (!response) return;

    setProducts(response);
  };

  useEffect(() => {
    getDataByNick();
  }, []);

  return (
    <div>
      <header className="bg-sec p-2">
        <p className="text-oversec text-center text-3xl">Loja</p>
      </header>
      <main>
        <h1>Fazer pedido</h1>
      </main>
    </div>
  );
}
