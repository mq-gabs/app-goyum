import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/api";
import { useEffect, useState } from "react";
import { TStore } from "../utils/type";
import StoreItem from "../components/StoreItem";
import Loading from "../components/Loading";

export default function PublicHome() {
  const [fetch, loading] = useApi();
  const [stores, setStores] = useState<TStore[]>([]);

  const getStores = async () => {
    const response = await fetch({
      path: "/stores",
    });

    if (!response) return;

    setStores(response.list);
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <header className="p-4 bg-sec">
        <div className="flex justify-between max-w-[1000px] m-auto">
          <div className="text-5xl font-bold text-prim">GoYum</div>
          <div className="my-auto">
            <nav>
              <ul className="text-oversec flex gap-8 text-xl">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:underline">
                    <div className="flex gap-2 items-center">
                      Login
                      <FaArrowRight />
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-[1000px] mx-auto p-4">
          <h3 className="text-xl font-bold mb-4">Lojas</h3>
          {stores.length !== 0 && !loading && (
            <ul>
              {stores.map((data) => (
                <li key={data.id}>
                  <StoreItem data={data} />
                </li>
              ))}
            </ul>
          )}
          {stores.length === 0 && !loading && (
            <div className="p-4">
              <p className="text-soft text-center text-xl">
                Nenhuma loja encontrada...
              </p>
            </div>
          )}
          {loading && (
            <div className="flex justify-center text-text">
              <Loading />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
