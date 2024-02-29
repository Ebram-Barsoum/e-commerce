
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


const userToken = localStorage.getItem('userToken');

export function addToWish(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
        productId
    }, {
        headers: {
            'token':userToken
        }
    })
}

export function deleteWishItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            'token':userToken
        }
    })
}

export function getWishItems() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
            'token':userToken
        }
    });
}

export function useGetWishList(key, func) {
    return useQuery({ queryKey: key, queryFn: func });
}

export function useWhishList(func) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: func,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['whishList']);
            toast.success(data.data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}