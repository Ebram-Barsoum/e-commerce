import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}

export function useCategories(key, func) {
    return useQuery({ queryKey: key, queryFn: func });
}