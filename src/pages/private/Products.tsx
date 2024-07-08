import { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";
import { TProduct } from "../../utils/type";
import Loading from "../../components/Loading";
import ProductItem from "../../components/ProductItem";
import { Link } from "react-router-dom";
import { IoBagAddSharp } from "react-icons/io5";
import Input from "../../components/Input";

export default function Products() {
  const [fetch, loading] = useApi();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    const response = await fetch({
      path: "/products",
    });

    if (!response) return;

    setProducts(response.list);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (index: number, data: Partial<TProduct>) => {
    setProducts((prev) => {
      prev[index] = {
        ...prev[index],
        ...data,
      };

      return [...prev];
    });
  };

  return (
    <main className="p-2 bg">
      <div className="flex justify-between p-2">
        <h1 className="text-xl font-bold uppercase text-text">Produtos</h1>
        <Link to="/produtos/novo">
          <div className="bg-prim p-2 rounded flex gap-2 text-overprim items-center">
            <IoBagAddSharp className="text-overprim" />
            Novo Produto
          </div>
        </Link>
      </div>
      <div className="p-2">
        <Input
          label="Pesquisar produto"
          id="search-product"
          placeholder="Nome do produto..."
          value={search}
          onChange={(value) => setSearch(value)}
          icon="search"
        />
      </div>
      {loading && <Loading />}
      {!loading && products.length === 0 && (
        <div>
          <p className="text-soft text-center">Nenhum produto encontrado...</p>
        </div>
      )}
      {!loading && products.length !== 0 && (
        <ul className="flex flex-col gap-2">
          {products.map((data, index) => (
            <li key={data.id}>
              <ProductItem
                data={data}
                onChange={(data) => handleChange(index, data)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
