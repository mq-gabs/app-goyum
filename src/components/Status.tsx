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

  return (
    <div
      className={clsx(
        `flex gap-2 items-center text-xl animate-pulse rounded p-1 text-overprim ${statusData.color}`,
        {
          "animate-none": status === "done" || status === "cancelled",
        }
      )}
    >
      <statusData.Icon />
      {statusData.text}
    </div>
  );
}
