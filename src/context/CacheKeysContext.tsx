import { useContext, createContext } from "react";

type CacheKeysValue = {
  postsKey: string;
};

export const CacheKeysContext = createContext<CacheKeysValue>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
