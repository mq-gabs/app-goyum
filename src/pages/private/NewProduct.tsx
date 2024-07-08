import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/api";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

type TCreateProduct = {
  name: string;
  description: string;
  price: number;
};

export default function NewProduct() {
  const [data, setData] = useState<TCreateProduct>({} as TCreateProduct);
  const nav = useNavigate();

  const [fetch, loading] = useApi();

  const handleUpdate = (data: Partial<TCreateProduct>) => {
    setData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSaveProduct = async () => {
    if (!data.name || !data.description || !data.price) {
      toast("Preencha todos os campos!", { type: "warning" });
      return;
    }

    data.price = Number(data.price) * 100;

    const response = await fetch({
      path: "/products",
      method: "POST",
      body: data,
    });

    if (!response) return;

    toast(response?.message || "Sucesso!", { type: "success" });

    nav("/produtos");
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Novo produto</h1>
      <div>
        <form className="flex gap-2 flex-col">
          <Input
            id="product-name"
            label="Nome"
            placeholder="Digite o nome..."
            onChange={(value) => handleUpdate({ name: value })}
            value={data.name}
          />
          <Input
            id="product-description"
            label="Descrição"
            placeholder="Digite uma descrição..."
            onChange={(value) => handleUpdate({ description: value })}
            value={data.description}
          />
          <Input
            id="product-price"
            label="Preço (R$)"
            type="number"
            placeholder="Digite o preço..."
            onChange={(value) => handleUpdate({ price: Number(value) })}
            value={data.price}
          />
          <div className="flex justify-between">
            <Button type="cancel" onClick={() => nav("/produtos")}>
              Voltar
            </Button>
            <Button disabled={loading} onClick={handleSaveProduct}>
              <div className="flex gap-2 items-center">
                {loading && (
                  <div>
                    <Loading />
                  </div>
                )}
                Salvar
              </div>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
