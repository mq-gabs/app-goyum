import { useEffect, useState } from "react";
import { TOrder } from "../../utils/type";
import { useApi } from "../../hooks/api";
import { Link, useParams } from "react-router-dom";
import {
  MdDeliveryDining,
  MdOutlinePendingActions,
  MdPlace,
} from "react-icons/md";
import { FaCheck, FaCheckCircle, FaUserAlt } from "react-icons/fa";
import LoadingPage from "../LoadingPage";
import { formatCurrency, formatDate } from "../../utils/functions";
import { IoIosArrowBack, IoMdTime } from "react-icons/io";
import Status from "../../components/Status";
import Button from "../../components/Button";
import { PiCookingPotFill } from "react-icons/pi";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";

const actionsParams = {
  pending: {
    text: "Aguardar",
    Icon: MdOutlinePendingActions,
    type: "ok",
    status: "pending",
  },
  make: {
    text: "Preparar",
    Icon: PiCookingPotFill,
    type: "ok",
    status: "making",
  },
  delivery: {
    text: "Enviar",
    Icon: MdDeliveryDining,
    type: "ok",
    status: "delivery",
  },
  done: {
    text: "Concluir",
    Icon: FaCheckCircle,
    type: "success",
    status: "done",
  },
  cancel: {
    text: "Cancelar",
    Icon: TiCancel,
    type: "danger",
    status: "cancelled",
  },
};

const actionsByStatus = {
  pending: {
    act1: actionsParams.cancel,
    act2: actionsParams.make,
  },
  making: {
    act1: actionsParams.pending,
    act2: actionsParams.delivery,
  },
  delivery: {
    act1: actionsParams.make,
    act2: actionsParams.done,
  },
  done: {
    act1: actionsParams.delivery,
    act2: null,
  },
  cancelled: {
    act1: actionsParams.pending,
    act2: actionsParams.make,
  },
};

export default function ViewOrder() {
  const [
    {
      id: order_id,
      client_info,
      created_at,
      products,
      status,
      observations,
      total_price,
    },
    setProduct,
  ] = useState<TOrder>({} as TOrder);

  const { id } = useParams();

  const [fetch, loading] = useApi();

  const fetchProduct = async () => {
    const response = await fetch({
      path: `/orders/${id}`,
    });

    if (!response) return;

    setProduct(response);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!order_id || loading) return <LoadingPage />;

  const { act1, act2 } = actionsByStatus[status];

  const handleUpdateStatus = async (nextStatus: string) => {
    const response = await fetch({
      path: `/orders/${id}`,
      method: "PATCH",
      body: {
        status: nextStatus,
      },
    });

    if (!response) return;

    toast(response?.message, {
      type: "success",
    });

    fetchProduct();
  };

  return (
    <main className="p-2">
      <div className="mb-2">
        <Link to="/pedidos">
          <div className="flex gap-1 items-center text-xl text-prim">
            <IoIosArrowBack />
            Voltar
          </div>
        </Link>
      </div>
      <h1 className="text-xl font-bold mb-4">Pedido</h1>
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-4 flex justify-center">
          <div className="w-fit">
            <Status status={status} />
          </div>
        </div>
        <div className="mb-4">
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
          <div className="text-xl text-text flex gap-2 items-center">
            <IoMdTime />
            <p className=" text-base font-semibold">
              {formatDate(created_at as string)}
            </p>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-semibold">Items:</p>
          <ul className="w-fit mx-auto">
            {products?.map((item) => (
              <li key={item.id}>
                <div className="flex justify-between">
                  <p>
                    {item.quantity} x {item.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="text-xl">
            TOTAL{" "}
            <span className="font-semibold">{formatCurrency(total_price)}</span>
          </p>
          <p className="flex gap-1 items-center">
            <FaCheck className="text-green-400" /> Pago
          </p>
        </div>
        {observations && (
          <div className="text-red-600 mt-2">
            <p className="font-bold">Observações:</p>
            <p>{observations}</p>
          </div>
        )}
        <div className="mt-4 flex justify-between gap-2">
          {act1 && (
            <Button
              type={act1.type as any}
              onClick={() => handleUpdateStatus(act1.status)}
            >
              <div className="flex gap-2 items-center">
                <act1.Icon />
                {act1.text}
              </div>
            </Button>
          )}
          {act2 && (
            <Button
              type={act2.type as any}
              onClick={() => handleUpdateStatus(act2.status)}
            >
              <div className="flex gap-2 items-center">
                <act2.Icon />
                {act2.text}
              </div>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
