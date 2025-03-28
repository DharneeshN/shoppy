import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

export const useFetchProducts = () => {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts });
};
