'use client'
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { ProductItemTotalPrice } from "../helpers/product";

export interface CartProduct extends ProductItemTotalPrice {
  quantity: number
}

interface ICartProduct {
  products: CartProduct[]
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
  total: number
  subtotal: number
  totalDiscount: number
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
}

export const CartContext = createContext<ICartProduct>({
  products: [],
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  subtotal: 0,
  total: 0,
  totalDiscount: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0
})

const CartProvider = ({children}: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem("@fws-store/cart-products") || "[]")
  )

  useEffect(() => {
    localStorage.setItem("@fws-store/cart-products", JSON.stringify(products))
  }, [products])

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice  * product.quantity
    }, 0)
  }, [products])

  const totalDiscount = subtotal - total

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

  const decreaseProductQuantity = (productId: string) => {
    setProducts(prev => 
      prev.map(cartProduct => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          }
        }
        return cartProduct
      }).filter(cartProduct => cartProduct.quantity > 0)
    )
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts(prev => 
      prev.map(cartProduct => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          }
        }
        return cartProduct
      })
    )
  }

  const removeProductFromCart = (productId: string) => {
    setProducts(prev => prev.filter(cartProduct => cartProduct.id !== productId))
  }

  return (
    <CartContext.Provider value={{
      products,
      addProductToCart,
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProductFromCart,
      total,
      subtotal,
      totalDiscount,
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      cartTotalPrice: 0
    }}>
        {children}
    </CartContext.Provider>
  );
}

export default CartProvider
