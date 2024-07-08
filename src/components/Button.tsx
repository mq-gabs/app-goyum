import clsx from "clsx";
import { ReactNode } from "react";

export default function Button({
  onClick,
  children,
  disabled = false,
}: {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (onClick && !disabled) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "bg-prim text-overprim px-4 py-2 rounded uppercase font-semibold",
        {
          "bg-soft cursor-default": disabled,
        }
      )}
    >
      {children}
    </button>
  );
}
