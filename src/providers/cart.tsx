'use client'
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number
}

interface ICartProduct {
  products: CartProduct[]
  addProductToCart: (product: CartProduct) => void
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
}

export const CartContext = createContext<ICartProduct>({
  products: [],
  addProductToCart: () => {},
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0
})

const CartProvider = ({children}: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const addProductToCart = (product: CartProduct) => {
    setProducts(prev => [...prev, product ])
  }

  return (
    <CartContext.Provider value={{
      products,
      addProductToCart,
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      cartTotalPrice: 0
    }}>
        {children}
    </CartContext.Provider>
  );
}

export default CartProvider
