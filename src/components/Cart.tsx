import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TCartItem, TProduct } from "../utils/type";
import Button from "./Button";
import OrderProductItem from "./OrderProductItem";
import { formatCurrency } from "../utils/functions";

export default function Cart({
  data,
  onClose,
  onAdd,
  onRemove,
  onClear,
}: {
  data: TCartItem[];
  onClose: () => void;
  onRemove: (data: TProduct) => void;
  onAdd: (data: TProduct) => void;
  onClear: () => void;
}) {
  const total = data.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  return (
    <div>
      <div className="max-w-[1000px] mx-auto p-4">
        <div className="mb-2 flex justify-between gap-2">
          <Button type="inverted_cancel" onClick={onClose}>
            <div className="flex gap-2 items-center">
              <FaArrowLeft />
              Voltar
            </div>
          </Button>
          <Button onClick={onClear} type="inverted_danger">
            Esvaziar carrinho
          </Button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Veja seus items:</h3>
        </div>
        <div>
          {data?.length !== 0 && (
            <ul className="flex flex-col gap-2">
              {data.map((d) => (
                <li>
                  <OrderProductItem
                    data={d}
                    onAdd={() => onAdd(d)}
                    onRemove={() => onRemove(d)}
                    quantity={d.quantity}
                  />
                </li>
              ))}
            </ul>
          )}
          {data.length === 0 && (
            <div className="p-4">
              <p className="text-soft text-xl text-center">
                Seu carrinho está vazio...
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end py-2">
          <p className="text-xl">
            TOTAL:{"  "}
            <span className="font-bold text-sec">{formatCurrency(total)}</span>
          </p>
        </div>
        <div className="flex justify-end">
          <Button disabled={data.length === 0}>
            <div className="flex gap-2 items-center">
              Continuar
              <FaArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
