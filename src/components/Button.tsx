import clsx from "clsx";
import { ReactNode } from "react";

export default function Button({
  onClick,
  children,
  disabled = false,
  type = "ok",
}: {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: "ok" | "danger" | "cancel";
}) {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (onClick && !disabled) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(" px-4 py-2 rounded uppercase font-semibold", {
        "bg-soft text-overprim cursor-default": disabled,
        "bg-prim text-overprim": !disabled && type === "ok",
        "bg-red-500 text-overprim": !disabled && type === "danger",
        "bg-gray-600 text-overprim": !disabled && type === "cancel",
      })}
    >
      {children}
    </button>
  );
}
