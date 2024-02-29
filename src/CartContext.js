import { createContext, useContext, useState } from "react"

const CartContext = createContext(null);

export default function CartContextProvider({children}) {
    const [open, setOpen] = useState(false);

    return <CartContext.Provider value={{ open, setOpen }}>
        {children}
    </CartContext.Provider>
}

export function useCartContext(){
    return useContext(CartContext);
}