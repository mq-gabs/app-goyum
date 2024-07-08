export type TProduct = {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
};

export type TStore = {
  id: string;
  name: string;
  description: string;
  nick: string;
};
