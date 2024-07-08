import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "./user";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export function useApi() {
  const { signOut } = useStore();
  const nav = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const { data: storeData } = useStore();

  const fetch = async ({
    method = "GET",
    path,
    body,
    query,
  }: {
    method?: "GET" | "POST" | "PATCH";
    path: string;
    body?: any;
    query?: any;
  }) => {
    setLoading(true);
    try {
      const { data } = await instance({
        url: path,
        method,
        data: body,
        params: query,
        headers: {
          Authorization: `Bearer ${storeData?.token || ""}`,
        },
      });

      return data;
    } catch (error: any) {
      if (error?.response?.status === 403) {
        signOut();
        toast('Faça login para continuar', {
          type: 'warning',
        });
        nav('/login');
        return;
      }

      const message = error?.response?.data?.message || "Algo deu errado";

      toast(message, {
        type: "error",
        autoClose: 5000,
      });

      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  return [fetch, loading] as const;
}
