import { FaArrowLeft } from "react-icons/fa";
import { TCartItem, TCustomerInfo, TProduct } from "../utils/type";
import Button from "./Button";
import { useState } from "react";
import CartList from "./CartList";
import CustomerInfoForm from "./CustomerInfoForm";
import FinalCartStep from "./FinalCartStep";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useApi } from "../hooks/api";

export default function Cart({
  data,
  onClose,
  onAdd,
  onRemove,
  onClear,
  storeId,
}: {
  data: TCartItem[];
  onClose: () => void;
  onRemove: (data: TProduct) => void;
  onAdd: (data: TProduct) => void;
  onClear: () => void;
  storeId?: string;
}) {
  const [step, setStep] = useState<"products" | "info" | "final" | "ordering">(
    "products"
  );
  const [customerInfo, setCustomerInfo] = useState<TCustomerInfo>(
    {} as TCustomerInfo
  );
  const total = data.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const [fetch] = useApi();

  const handleExtractCustomerInfo = (data: TCustomerInfo) => {
    setCustomerInfo(data);
    setStep("final");
  };

  const handleConfirmOrder = async (observations: string) => {
    if (data.length === 0) {
      toast("O carrinho está vazio", { type: "warning" });
      return;
    }

    if (!storeId) {
      toast("Loja não localizada!", { type: "error" });
      return;
    }

    setStep("ordering");

    const response = await fetch({
      path: `/orders/${storeId}`,
      body: {
        observations,
        products: data,
        client_info: customerInfo,
      },
      method: "POST",
    });

    setStep("final");

    if (!response) return;

    toast(response?.message, { type: "success" });

    onClear();
    onClose();

    setTimeout(() => {
      window.open(`/pedidos/${response?.id}`, "_blank");
    }, 1000);
  };

  return (
    <div>
      <div className="max-w-[1000px] mx-auto p-4">
        <div className="mb-2 flex justify-between gap-2">
          {step !== "ordering" && (
            <Button type="inverted_cancel" onClick={onClose}>
              <div className="flex gap-2 items-center">
                <FaArrowLeft />
                Ver produtos
              </div>
            </Button>
          )}
          {step === "products" && (
            <Button onClick={onClear} type="inverted_danger">
              Esvaziar carrinho
            </Button>
          )}
        </div>
        <div>
          {step === "products" && (
            <CartList
              data={data}
              onAdd={onAdd}
              onRemove={onRemove}
              onContinue={() => setStep("info")}
              total={total}
            />
          )}
          {step === "info" && (
            <CustomerInfoForm
              onBack={() => setStep("products")}
              onExtract={handleExtractCustomerInfo}
            />
          )}
          {step === "final" && (
            <FinalCartStep
              data={data}
              total={total}
              onBack={() => setStep("info")}
              onOrder={handleConfirmOrder}
            />
          )}
          {step === "ordering" && (
            <div className="flex justify-center p-8">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
