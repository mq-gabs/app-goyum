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
  type?:
    | "ok"
    | "danger"
    | "cancel"
    | "inverted_danger"
    | "inverted_ok"
    | "inverted_cancel";
}) {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (onClick && !disabled) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(" px-2 py-2 rounded uppercase font-semibold text-sm", {
        "bg-soft text-overprim cursor-default": disabled,
        "bg-prim text-overprim": !disabled && type === "ok",
        "bg-overprim text-prim": !disabled && type === "inverted_ok",
        "bg-red-500 text-overprim": !disabled && type === "danger",
        "bg-overprim text-red-500": !disabled && type === "inverted_danger",
        "bg-gray-600 text-overprim": !disabled && type === "cancel",
        "bg-overprim text-gray-600": !disabled && type === "inverted_cancel",
      })}
    >
      {children}
    </button>
  );
}
