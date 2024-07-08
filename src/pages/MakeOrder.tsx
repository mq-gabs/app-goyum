import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApi } from "../hooks/api";
import { TCartItem, TProduct, TStore } from "../utils/type";
import OrderProductItem from "../components/OrderProductItem";
import { IoCart } from "react-icons/io5";
import Button from "../components/Button";
import Loading from "../components/Loading";

function getStoreItemsTag(id: string) {
  return `@cart:store-${id}`;
}

export default function MakeOrder() {
  const [fetch, loading] = useApi();

  const [products, setProducts] = useState<TProduct[]>([]);
  const [store, setStore] = useState<TStore>({} as TStore);

  const [cart, setCart] = useState<TCartItem[]>([]);

  const getDataById = async (id: string) => {
    const response = await fetch({
      path: `products/${id}`,
    });

    if (!response) return;

    setProducts(response.list);
    setStore(response.store);
  };

  const handleAddProduct = (item: TProduct) => {
    const foundProductIndex = cart.findIndex(
      (product) => product.id === item.id
    );

    if (foundProductIndex !== -1) {
      const newCart = [...cart];

      newCart[foundProductIndex].quantity += 1;

      setCart(newCart);

      return;
    }

    setCart((prev) => [
      ...prev,
      {
        ...item,
        quantity: 1,
      } as TCartItem,
    ]);
  };

  const handleRemoveProduct = (item: TProduct) => {
    const foundProductIndex = cart.findIndex(
      (product) => product.id === item.id
    );

    if (foundProductIndex !== -1) {
      const newCart = [...cart];

      if (cart[foundProductIndex].quantity === 1) {
        setCart(newCart.filter((p) => p.id !== item.id));
        return;
      }

      newCart[foundProductIndex].quantity -= 1;

      setCart(newCart);

      return;
    }

    toast("Este item já foi removido!", { type: "warning" });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];

    if (!id) {
      toast("Id não encontrado!", { type: "error" });
      return;
    }

    const storageCartJson = localStorage.getItem(getStoreItemsTag(id));

    const storageCardData = JSON.parse(storageCartJson || "[]");

    setCart(storageCardData);

    getDataById(id);
  }, []);

  return (
    <div>
      <header className="bg-sec p-4">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-oversec text-center text-3xl">
            {store?.name || "Loja..."}
          </p>
        </div>
      </header>
      <main className="max-w-[1000px] mx-auto p-2">
        <h3 className="text-xl font-semibold mb-4">Produtos:</h3>

        <div className="fixed bottom-4 right-4">
          <div>
            <Button>
              <div>
                <IoCart className="text-5xl" />
                <div className="absolute top-1 right-1 bg-red-500 rounded-full text-overprim w-[20px] h-[20px] font-bold  text-xs flex justify-center items-center">
                  {cart.length}
                </div>
              </div>
            </Button>
          </div>
        </div>

        <div>
          {products.length !== 0 && !loading && (
            <ul className="flex flex-col gap-2">
              {products.map((data) => (
                <li key={data.id}>
                  <OrderProductItem
                    data={data}
                    onAdd={() => handleAddProduct(data)}
                    onRemove={() => handleRemoveProduct(data)}
                    quantity={cart.find((p) => p.id === data.id)?.quantity || 0}
                  />
                </li>
              ))}
            </ul>
          )}
          {products.length === 0 && !loading && (
            <div className="p-4">
              <p className="text-xl text-soft text-center">
                Nenhum produto encontrado...
              </p>
            </div>
          )}
          {loading && (
            <div className="flex justify-center p-4">
              <Loading />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
