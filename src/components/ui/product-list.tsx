import { Product } from "@prisma/client"
import ProductItem from "@/components/ui/product-item"
import { computeProductTotalPrice } from "@/helpers/product"

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
  <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
    { products.map(product => (
      <div className="w-[156px]" key={product.id}>
        <ProductItem product={computeProductTotalPrice(product)}/>
      </div>
    ))}
  </div> 
  )
}

export default ProductList