import { createContext, ReactNode, useContext, useState } from "react";

type TStoreData = {
  id: string;
  name: string;
  description: string;
  nick: string;
  email: string;
  token: string;
};

type TStoreContext = {
  data: TStoreData;
  saveCredentials: (arg: TStoreData) => void;
  signOut: () => void;
};

const StoreContext = createContext({} as TStoreContext);

const storeTag = "@goyum:store_info@";

function StoreProvider({ children }: { children: ReactNode }) {
  const storageData = localStorage.getItem(storeTag);

  const [data, setData] = useState<TStoreData>(JSON.parse(storageData || "{}"));

  const saveCredentials = (storeData: TStoreData) => {
    setData(storeData);
    localStorage.setItem(storeTag, JSON.stringify(storeData));
  };

  const signOut = () => {
    setData({} as TStoreData);
    localStorage.setItem(storeTag, "{}");
  };

  return (
    <StoreContext.Provider
      value={{
        data,
        saveCredentials,
        signOut,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  const context = useContext(StoreContext);

  return context;
}

export { StoreProvider, useStore };
