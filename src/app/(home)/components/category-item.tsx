import { Category } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { CATEGORY_ICON } from "@/constants/category-icons"
import Link from "next/link"

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
  <Link href={`/category/${category.slug}`}>
    <Badge className="flex items-center justify-center gap-2 rounded-lg py-3" variant="outline">
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  </Link> 
  )
}

export default CategoryItem
