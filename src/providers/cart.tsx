'use client'
import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
  quantity: number
}

interface ICartProduct {
  product: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
}

const CartContext = createContext<ICartProduct>({
  product: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0
})

const CartProvider = ({children}: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={{
      product: [],
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      cartTotalPrice: 0
    }}>
        {children}
    </CartContext.Provider>
  );
}

export default CartProvider
