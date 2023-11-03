import { Prisma } from '@prisma/client'
import { BodySelect } from 'src/body/select/body.select'
import { BrandSelect } from 'src/brand/select/brand.select'
import { ReviewSelect } from 'src/review/select/review.select'

export const CarSelect: Prisma.CarSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  city: true,
  volume: true,
  power: true,
  box: true,
  engine: true,
  drive: true,
  class: true,
  year: true,
  images: true,
  reviews: {
    select: ReviewSelect,
  },
  brand: {
    select: BrandSelect,
  },
  category: {
    select: BodySelect,
  },
  carBrandId: true,
  carCategoryId: true,
}
