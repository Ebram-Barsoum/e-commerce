import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const userToken = localStorage.getItem('userToken');

export function addToCart(productId) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        productId
    }, {
        headers: {
            'token':userToken
        }
    });
}

export function getCartItems() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            'token':userToken
        }
    })
}

export function deleteCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers: {
            'token':userToken
        }
    });
}

export function updateCartItemCount({productId,count}) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        count
    },{
        headers: {
            'token':userToken
        }
    });
}

export function cartCheckOut({cartId, shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        shippingAddress
    }, {
        headers: {
            'token':userToken
        }
    })
}

export function clearCart(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            'token':userToken
        }
    })
}

export function useGetCart(key, func) {
    return useQuery({ queryKey: key, queryFn: func});
}

export function useCart(func) {
  
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: func,
        onSuccess: (data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries(['cart']) 
        },
        onError: (error) => {
            toast.error(error.message);
    } });
}