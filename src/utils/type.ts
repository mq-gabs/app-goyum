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