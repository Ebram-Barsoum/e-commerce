import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products?limit=56");
  };

export const getProductDetails = (id) => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

export default function useProducts(key,func) {
    return useQuery({ queryKey: key, queryFn: func, select:(data)=>data?.data?.data});
}