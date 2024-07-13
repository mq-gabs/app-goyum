import { FaCheckCircle } from "react-icons/fa";
import { MdDeliveryDining, MdOutlinePendingActions } from "react-icons/md";
import { PiCookingPotFill } from "react-icons/pi";
import { TiCancel } from "react-icons/ti";
import { EStatus } from "../utils/enum";
import clsx from "clsx";

const statusTexts = {
  pending: {
    text: "Aguardando",
    Icon: MdOutlinePendingActions,
    color: "bg-gray-700",
  },
  making: {
    text: "Preparando",
    Icon: PiCookingPotFill,
    color: "bg-yellow-500",
  },
  delivery: {
    text: "Em delivery",
    Icon: MdDeliveryDining,
    color: "bg-blue-400",
  },
  done: {
    text: "Entregue",
    Icon: FaCheckCircle,
    color: "bg-green-500",
  },
  cancelled: {
    text: "Cancelado",
    Icon: TiCancel,
    color: "bg-red-600",
  },
};

export default function Status({ status }: { status: EStatus }) {
  const statusData = statusTexts[status];

  console.log({ status });

  return (
    <div
      className={clsx(
        `flex gap-1 items-center rounded p-1 text-overprim ${statusData.color}`,
        {
          "animate-none": ["done", "cancelled"].includes(status),
          "animate-pulse": !["done", "cancelled"].includes(status),
        }
      )}
    >
      <statusData.Icon />
      {statusData.text}
    </div>
  );
}
