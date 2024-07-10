import { FaArrowLeft } from "react-icons/fa";
import { formatCurrency } from "../utils/functions";
import { TCartItem } from "../utils/type";
import Button from "./Button";
import SimpleProductItem from "./SimpleProductsItem";
import { BsCartCheck } from "react-icons/bs";
import Textarea from "./Textarea";
import { useState } from "react";

export default function FinalCartStep({
  data,
  total,
  onBack,
  onOrder,
}: {
  data: TCartItem[];
  total: number;
  onBack: () => void;
  onOrder: (observations: string) => void;
}) {
  const [observations, setObservations] = useState<string>("");

  return (
    <div>
      <div className="flex flex-col gap-8">
        {data?.length !== 0 && (
          <ul>
            {data.map((item) => (
              <li>
                <SimpleProductItem data={item} />
              </li>
            ))}
          </ul>
        )}
        {data?.length === 0 && (
          <div className="p-2">
            <p className="text-xl text-soft text-center">Nenhum item aqui...</p>
          </div>
        )}
        <div className="text-xl text-center mt-4">
          <p>
            Total:{"  "}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>
        <div>
          <p className="font-semibold">Opções de pagamento:</p>
          <ul className="max-w-[300px] mx-auto">
            <li className="list-disc">Pix</li>
          </ul>
        </div>
        <div>
          <Textarea
            placeholder="Observações"
            label="Observações"
            id="observations"
            value={observations}
            onChange={(value) => setObservations(value)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="cancel" onClick={onBack}>
          <div className="flex gap-2 items-center">
            <FaArrowLeft />
            Voltar
          </div>
        </Button>
        <Button onClick={() => onOrder(observations)}>
          <div className="flex gap-2 items-center">
            <BsCartCheck className="text-xl" />
            Confirmar pedido
          </div>
        </Button>
      </div>
    </div>
  );
}
