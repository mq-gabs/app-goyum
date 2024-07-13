import { useNavigate, useParams } from "react-router-dom";
import LogoHome from "../components/LogoHome";
import LoadingPage from "./LoadingPage";
import { useEffect, useState } from "react";
import { TOrder } from "../utils/type";
import { formatCurrency } from "../utils/functions";
import { useApi } from "../hooks/api";
import { MdOutlineStorefront, MdPlace } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import Status from "../components/Status";

export default function MyOrder() {
  const { id } = useParams();

  const nav = useNavigate();

  const [
    {
      id: order_id,
      client_info,
      status,
      products,
      observations,
      store,
      total_price,
    },
    setOrder,
  ] = useState<TOrder>({} as TOrder);

  const [fetch] = useApi();

  const handleFetchOrder = async () => {
    const response = await fetch({
      path: `/orders/${id}`,
    });

    if (!response) {
      nav("/");
    }

    setOrder(response);
  };

  useEffect(() => {
    handleFetchOrder();
  }, []);

  if (!order_id) {
    return <LoadingPage />;
  }

  return (
    <main className="max-w-[400px] mx-auto p-4">
      <div className="flex justify-center mb-4">
        <LogoHome />
      </div>
      <div className="p-4 flex justify-center gap-2 text-xl">
        <Status status={status} />
      </div>
      <div>
        <div className="mb-4">
          <div className="text-sec text-xl flex gap-2 items-center">
            <MdOutlineStorefront />
            <p className="font-bold">{store?.name || "Store Name"}</p>
          </div>
          <div className="text-prim text-xl flex gap-2 items-center">
            <FaUserAlt />
            <p className=" font-semibold">{client_info.name}</p>
          </div>
          <div className="text-xl text-text flex gap-2 items-center">
            <MdPlace />
            <p className="font-semibold">
              {client_info.address.street}, {client_info.address.number} -{" "}
              {client_info.address.neighborhood}
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold">Items:</p>
          <ul>
            {products?.map((item) => (
              <li key={item.id}>
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>
                    {formatCurrency(item.price)} x {item.quantity} ={" "}
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-semibold text-xl flex justify-between mb-4">
          <p>Total</p>
          <p>{formatCurrency(total_price)}</p>
        </div>
        {observations && (
          <div>
            <p className="font-semibold">Observações:</p>
            <p>{observations}</p>
          </div>
        )}
      </div>
    </main>
  );
}
