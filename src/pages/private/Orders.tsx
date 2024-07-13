import { useEffect, useState } from "react";
import { TOrder } from "../../utils/type";
import { EStatus } from "../../utils/enum";
import clsx from "clsx";
import { useApi } from "../../hooks/api";
import Loading from "../../components/Loading";
import OrderItem from "../../components/private/OrderItem";

const storeStatusTexts: { [key in string]: string } = {
  all: "Todos",
  pending: "Pendente",
  making: "Fazendo",
  delivery: "Em delivery",
  done: "Entregue",
  cancelled: "Cancelado",
};

const statusNames = ["all", ...Object.values(EStatus)];

export default function Orders() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [status, setStatus] = useState<EStatus | "all">(EStatus.PENDING);
  const [counts, setCounts] = useState<any>({});

  const [fetch, loading] = useApi();

  const fetchOrders = async () => {
    const response = await fetch({
      path: "/orders",
      query: {
        status: status === "all" ? null : status,
      },
    });

    if (!response) return;

    const { list, ...rest } = response;

    setCounts(rest);

    setOrders(list);
  };

  const getCount = (currStatus: EStatus | "all") => {
    const count = counts[`${currStatus}_count` as any];

    if (count === undefined || count === null) return "";

    return `(${count})`;
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  return (
    <main className="p-2">
      <h1 className="font-bold text-2xl text-text mb-4">Pedidos</h1>
      <div className="mb-4 overflow-y-auto">
        <ul className="flex gap-2 p-2">
          {statusNames.map((value) => (
            <li
              className={clsx(
                "px-2 py-1 border rounded text-overprim cursor-pointer hover:brightness-110",
                {
                  "bg-prim": status === value,
                  "bg-soft": status !== value,
                }
              )}
              onClick={() => setStatus(value as any)}
              key={value}
            >
              <p className="whitespace-nowrap">
                {storeStatusTexts[value]} {getCount(value as any)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {!loading && orders.length !== 0 && (
          <ul className="flex flex-col gap-2">
            {orders.map((order) => (
              <li key={order.id}>
                <OrderItem data={order} hideStatus={status !== "all"} />
              </li>
            ))}
          </ul>
        )}
        {!loading && orders.length === 0 && (
          <div className="p-4">
            <p className="text-center text-soft text-xl">
              {status === "all"
                ? "Nenhum pedido encontrado"
                : `Nenhum pedido ${storeStatusTexts[status].toLowerCase()}`}
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
  );
}
