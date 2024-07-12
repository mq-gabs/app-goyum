import { EStatus } from "./enum";

export type TProduct = {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
};

export type TCartItem = TProduct & { quantity: number };

export type TStore = {
  id: string;
  name: string;
  description: string;
  nick: string;
};

export type TCustomerInfo = {
  name: string;
  contact: string;
  address: {
    street: string;
    number: number;
    neighborhood: string;
  };
};

export type TOrder = {
  id: string;
  store_id: string;
  status: EStatus;
  client_info: TCustomerInfo;
  observations?: string;
  created_at: string | Date;
  products: (TProduct & { quantity: number })[];
  store?: TStore;
  total_price: number;
};
