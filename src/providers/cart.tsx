'use client'
import { ReactNode, createContext, useState } from "react";
import { ProductItemTotalPrice } from "../helpers/product";

export interface CartProduct extends ProductItemTotalPrice {
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

    const productIsAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)

    if (productIsAlreadyOnCart) {
      setProducts(prev => 
        prev.map(cartProduct => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity
            }
          }
          return cartProduct
        })  
      )
      return
    }

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
