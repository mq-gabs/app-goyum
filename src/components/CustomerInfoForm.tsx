import { useState } from "react";
import { TCustomerInfo } from "../utils/type";
import Input from "./Input";
import Button from "./Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const customerInfoTag = "@goyum:customer-info";

export default function CustomerInfoForm({
  onExtract,
  onBack,
}: {
  onExtract: (data: TCustomerInfo) => void;
  onBack: () => void;
}) {
  const storageInfoJson = localStorage.getItem(customerInfoTag);

  const [info, setInfo] = useState<TCustomerInfo>(
    JSON.parse(storageInfoJson || "{}") as TCustomerInfo
  );

  const handleUpdate = (data: Partial<TCustomerInfo>) => {
    setInfo((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleUpdateAddress = (data: Partial<TCustomerInfo["address"]>) => {
    setInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        ...data,
      },
    }));
  };

  const handleContinue = () => {
    console.log({ info });

    if (!info.name || !info.contact || !info?.address) {
      toast("Preencha todas as informações!", { type: "warning" });
      return;
    }

    if (
      !info?.address?.number ||
      !info?.address?.neighborhood ||
      !info?.address?.street
    ) {
      toast("Preencha todas as informações de endereço!", { type: "warning" });
      return;
    }

    localStorage.setItem(customerInfoTag, JSON.stringify(info));
    onExtract(info);
  };

  return (
    <div>
      <form className="flex flex-col gap-2">
        <Input
          id="customer-name"
          label="Seu nome"
          onChange={(value) => handleUpdate({ name: value })}
          value={info?.name}
          placeholder="Digite seu nome..."
        />
        <Input
          id="customer-contact"
          label="Seu contato"
          onChange={(value) => handleUpdate({ contact: value })}
          value={info?.contact}
          placeholder="Telefone ou email"
        />
        <Input
          id="customer-neighborhood"
          label="Bairro"
          onChange={(value) => handleUpdateAddress({ neighborhood: value })}
          value={info?.address?.neighborhood}
          placeholder="Digite o bairro..."
        />
        <Input
          id="customer-street"
          label="Rua"
          onChange={(value) => handleUpdateAddress({ street: value })}
          value={info?.address?.street}
          placeholder="Digite o nome da sua rua..."
        />
        <Input
          id="customer-number"
          label="Número"
          type="number"
          onChange={(value) => handleUpdateAddress({ number: Number(value) })}
          value={info?.address?.number}
          placeholder="Número da residência..."
        />
        <div className="flex justify-between">
          <Button type="cancel" onClick={onBack}>
            <div className="flex gap-2 items-center">
              <FaArrowLeft />
              Voltar
            </div>
          </Button>
          <Button onClick={handleContinue}>
            <div className="flex gap-2 items-center">
              Continuar
              <FaArrowRight />
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
